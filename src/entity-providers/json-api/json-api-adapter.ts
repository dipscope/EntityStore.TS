import { Fn, PropertyMetadata, PropertyName, ReferenceCallback } from '@dipscope/type-manager/core';
import { ReferenceKey, ReferenceValue, SerializerContext } from '@dipscope/type-manager/core';
import { TypeMetadata } from '@dipscope/type-manager/core';

import { Entity } from '../../entity';
import { EntityCollection } from '../../entity-collection';
import { Nullable } from '../../nullable';
import { AttributesObject } from './core/attributes-object';
import { DocumentObject } from './core/document-object';
import { RelationshipObject } from './core/relationship-object';
import { RelationshipsObject } from './core/relationships-object';
import { ResourceIdentifierObject } from './core/resource-identifier-object';
import { ResourceLinkageObject } from './core/resource-linkage-object';
import { ResourceObject } from './core/resource-object';
import { JsonApiResourceManager } from './json-api-resource-manager';
import { JsonApiResourceMetadata } from './json-api-resource-metadata';

/**
 * Represents json api adapter to build document objects from entities and back.
 * 
 * @type {JsonApiAdapter}
 */
export class JsonApiAdapter
{
    /**
     * Creates document object from entity collection.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * @param {EntityCollection<TEntity>} entityCollection Entity collection.
     * 
     * @returns {DocumentObject} Document object created from entity collection.
     */
    public createEntityCollectionDocumentObject<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, entityCollection: EntityCollection<TEntity>): DocumentObject
    {
        const resourceObjects = new Array<ResourceObject>();
        const documentObject = { data: resourceObjects } as DocumentObject;

        for (const entity of entityCollection)
        {
            const resourceObject = this.createEntityResourceObject(typeMetadata, entity);

            resourceObjects.push(resourceObject);
        }

        return documentObject;
    }

    /**
     * Creates document object from entity.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * @param {TEntity} entity Entity.
     * 
     * @returns {DocumentObject} Document object created from entity.
     */
    public createEntityDocumentObject<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, entity: TEntity): DocumentObject
    {
        const resourceObject = this.createEntityResourceObject(typeMetadata, entity);
        const documentObject = { data: resourceObject } as DocumentObject;

        return documentObject;
    }

    /**
     * Creates a resource object from an entity.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata of an entity.
     * @param {TEntity} entity Entity.
     * 
     * @returns {ResourceObject} Resource object created from an entity.
     */
    private createEntityResourceObject<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, entity: TEntity): ResourceObject
    {
        const jsonApiResourceMetadata = this.extractJsonApiResourceMetadataOrThrow(typeMetadata);
        const serializerContext = this.createSerializerContext(typeMetadata, entity);
        const serializedEntity = serializerContext.serialize(entity);

        const resourceObject = { type: jsonApiResourceMetadata.type } as ResourceObject;
        const attributesObject = {} as AttributesObject;
        const relationshipsObject = {} as RelationshipsObject;

        for (const propertyMetadata of typeMetadata.propertyMetadataMap.values())
        {
            if (propertyMetadata.serializationConfigured && !propertyMetadata.serializable)
            {
                continue;
            }

            const serializedPropertyName = propertyMetadata.serializedPropertyName;
            const propertyValue = serializedEntity[serializedPropertyName];

            if (Fn.isUndefined(propertyValue))
            {
                continue;
            }

            if (serializedPropertyName === 'id')
            {
                resourceObject.id = propertyValue;

                continue;
            }

            const propertyTypeMetadata = propertyMetadata.typeMetadata;
            const relationshipJsonApiResourceMetadata = this.extractJsonApiResourceMetadata(propertyTypeMetadata);

            if (!Fn.isNil(relationshipJsonApiResourceMetadata))
            {
                relationshipsObject[serializedPropertyName] = this.createRelationshipObject(relationshipJsonApiResourceMetadata, propertyValue);

                continue;
            }

            attributesObject[serializedPropertyName] = propertyValue;
        }

        if (!Fn.isEmpty(attributesObject)) 
        {
            resourceObject.attributes = attributesObject;
        }

        if (!Fn.isEmpty(relationshipsObject)) 
        {
            resourceObject.relationships = relationshipsObject;
        }

        return resourceObject;
    }

    /**
     * Creates relationship object from record.
     * 
     * @param {JsonApiResourceMetadata<TEntity>} jsonApiResourceMetadata Json api resource metadata.
     * @param {Record<PropertyName, any>} record Record.
     * 
     * @returns {RelationshipObject} Relationship object created from record.
     */
    private createRelationshipObject<TEntity extends Entity>(jsonApiResourceMetadata: JsonApiResourceMetadata<TEntity>, record: Record<PropertyName, any>): RelationshipObject
    {
        const resourceLinkageObject = { type: jsonApiResourceMetadata.type, id: record.id } as ResourceLinkageObject;
        const relationshipObject = { data: resourceLinkageObject } as RelationshipObject;

        return relationshipObject;
    }

    /**
     * Creates entity collection from a document object.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * @param {DocumentObject} documentObject Document object.
     * 
     * @returns {EntityCollection<TEntity>} Entity collection created from document object.
     */
    public createDocumentObjectEntityCollection<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, documentObject: DocumentObject): EntityCollection<TEntity>
    {
        const entityCollection = new EntityCollection<TEntity>();
        const resourceObjects = documentObject.data as Array<ResourceObject>;
        const relationshipResourceObjects = documentObject.included ?? new Array<ResourceObject>();

        for (const resourceObject of resourceObjects)
        {
            const entity = this.createResourceObjectEntity(typeMetadata, resourceObject, relationshipResourceObjects);

            if (Fn.isNil(entity))
            {
                continue;
            }

            entityCollection.push(entity);
        }

        return entityCollection;
    }

    /**
     * Creates entity from document object.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * @param {DocumentObject} documentObject Document object.
     * 
     * @returns {Nullable<TEntity>} Entity created from a document object.
     */
    public createDocumentObjectEntity<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, documentObject: DocumentObject): Nullable<TEntity>
    {
        const resourceObject = documentObject.data as ResourceObject;
        const includedResourceObjects = documentObject.included ?? new Array<ResourceObject>();
        const entity = this.createResourceObjectEntity(typeMetadata, resourceObject, includedResourceObjects);

        return entity;
    }

    /**
     * Creates entity from resource object.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Entity type metadata.
     * @param {Nullable<ResourceObject>} resourceObject Resource object.
     * @param {Array<ResourceObject>} includedResourceObjects Included resource objects.
     * 
     * @returns {TEntity} Entity created from resource object.
     */
    private createResourceObjectEntity<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, resourceObject: Nullable<ResourceObject>, includedResourceObjects: Array<ResourceObject>): Nullable<TEntity>
    {
        const serializedEntity = this.createResourceObjectSerializedEntity(typeMetadata, resourceObject, includedResourceObjects);
        const serializerContext = this.createSerializerContext(typeMetadata, serializedEntity);
        const entity = serializerContext.deserialize(serializedEntity) ?? null;

        return entity;
    }

    /**
     * Creates serialized entity from resource object.
     * 
     * @param {TypeMetadata<Entity>} typeMetadata Entity type metadata.
     * @param {Nullable<ResourceObject>} resourceObject Resource object.
     * @param {Array<ResourceObject>} includedResourceObjects Included resource objects.
     * 
     * @returns {Nullable<Entity>} Serialized entity created from resource object.
     */
    private createResourceObjectSerializedEntity(typeMetadata: TypeMetadata<Entity>, resourceObject: Nullable<ResourceObject>, includedResourceObjects: Array<ResourceObject>): Nullable<Entity>
    {
        if (Fn.isNil(resourceObject))
        {
            return null;
        }

        const serializedEntity = { type: resourceObject.type } as Entity;
        const attributes = resourceObject.attributes ?? {} as AttributesObject;
        const relationships = resourceObject.relationships ?? {} as RelationshipsObject;
        
        for (const propertyMetadata of typeMetadata.propertyMetadataMap.values())
        {
            if (propertyMetadata.serializationConfigured && !propertyMetadata.deserializable)
            {
                continue;
            }

            const serializedPropertyName = propertyMetadata.serializedPropertyName;

            if (serializedPropertyName === 'id')
            {
                serializedEntity.id = resourceObject.id;

                continue;
            }

            if (!Fn.isNil(attributes[serializedPropertyName]))
            {
                serializedEntity[serializedPropertyName] = attributes[serializedPropertyName];

                continue;
            }

            if (!Fn.isNil(relationships[serializedPropertyName]))
            {
                serializedEntity[serializedPropertyName] = this.createRelationshipObjectSerializedEntity(propertyMetadata, relationships[serializedPropertyName], includedResourceObjects);

                continue;
            }
        }

        return serializedEntity;
    }

    /**
     * Creates relationship object serialized entity. Basically it converts relationship data returned from
     * json api into serialized form of entity or entity collection.
     * 
     * @param {PropertyMetadata<TEntity, any>} propertyMetadata Relationship property metadata.
     * @param {RelationshipObject} relationshipObject Relationship object.
     * @param {Array<ResourceObject>} includedResourceObjects Included resource objects.
     * 
     * @returns {Nullable<Entity>|Array<Entity>} Nullable serialized entity or array of serialized entities depending from relationship object.
     */
    private createRelationshipObjectSerializedEntity(propertyMetadata: PropertyMetadata<Entity, any>, relationshipObject: RelationshipObject, includedResourceObjects: Array<ResourceObject>): Nullable<Entity> | Array<Entity>
    {
        const resourceLinkageObject = relationshipObject.data;

        if (Fn.isNil(resourceLinkageObject))
        {
            return null;
        }

        if (Fn.isArray(resourceLinkageObject))
        {
            const serializedEntities = new Array<Nullable<Entity>>();
            const collectionGenericMetadatas = propertyMetadata.genericMetadatas;

            if (Fn.isNil(collectionGenericMetadatas) || Fn.isEmpty(collectionGenericMetadatas))
            {
                return serializedEntities;
            }

            const resourceIdentifierObjects = resourceLinkageObject;
            const entityTypeMetadata = collectionGenericMetadatas[0][0] as TypeMetadata<any>;

            for (const resourceIdentifierObject of resourceIdentifierObjects) 
            {
                const resourceObject = this.linkResourceObject(resourceIdentifierObject, includedResourceObjects);
                const serializedEntity = this.createResourceObjectSerializedEntity(entityTypeMetadata, resourceObject, includedResourceObjects);

                serializedEntities.push(serializedEntity);
            }

            return serializedEntities;
        }

        const resourceIdentifierObject = resourceLinkageObject;
        const resourceObject = this.linkResourceObject(resourceIdentifierObject, includedResourceObjects);
        const serializedEntity = this.createResourceObjectSerializedEntity(propertyMetadata.typeMetadata, resourceObject, includedResourceObjects);

        return serializedEntity;
    }

    /**
     * Links resource identifier object to included instance.
     * 
     * @param {ResourceIdentifierObject} resourceIdentifierObject Resource identifier object.
     * @param {Array<ResourceObject>} includedResourceObjects Included resource objects.
     * 
     * @returns {ResourceObject} Linked resource object.
     */
    private linkResourceObject(resourceIdentifierObject: ResourceIdentifierObject, includedResourceObjects: Array<ResourceObject>): ResourceObject
    {
        let resourceObject = resourceIdentifierObject as ResourceObject;

        for (const includedResourceObject of includedResourceObjects)
        {
            if (includedResourceObject.type === resourceIdentifierObject.type && includedResourceObject.id === resourceIdentifierObject.id)
            {
                resourceObject = includedResourceObject;

                break;
            }
        }

        return resourceObject;
    }

    /**
     * Extracts json api resource metadata or throws an error.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * 
     * @returns {JsonApiResourceMetadata<TEntity>} Json api resource metadata.
     */
    public extractJsonApiResourceMetadataOrThrow<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>): JsonApiResourceMetadata<TEntity>
    {
        const jsonApiResourceMetadata = this.extractJsonApiResourceMetadata(typeMetadata);

        if (Fn.isNil(jsonApiResourceMetadata))
        {
            throw new Error(); // TODO: Propper error.
        }

        return jsonApiResourceMetadata;
    }

    /**
     * Extracts json api resource metadata.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * 
     * @returns {JsonApiResourceMetadata<TEntity>|undefined} Json api resource metadata or undefined if metadata is not present.
     */
    public extractJsonApiResourceMetadata<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>): JsonApiResourceMetadata<TEntity> | undefined
    {
        const jsonApiResourceMetadata = JsonApiResourceManager.extractJsonApiResourceMetadataFromTypeMetadata(typeMetadata);

        return jsonApiResourceMetadata;
    }

    /**
     * Creates serializer context for entity.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * @param {any} x Root object.
     * 
     * @returns {SerializerContext<TEntity>} Entity serializer context.
     */
    private createSerializerContext<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, x: any): SerializerContext<TEntity>
    {
        const serializerContext = new SerializerContext({
            $: x,
            path: '$',
            typeMetadata: typeMetadata,
            referenceCallbackMap: new WeakMap<ReferenceKey, Array<ReferenceCallback>>(),
            referenceMap: new WeakMap<ReferenceKey, ReferenceValue>()
        });

        return serializerContext;
    }
}
