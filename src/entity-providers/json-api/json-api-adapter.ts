import {
    Fn, ReferenceCallback, ReferenceKey, ReferenceValue, SerializerContext, TypeMetadata
} from '@dipscope/type-manager/core';

import { Entity } from '../../entity';
import { EntityCollection } from '../../entity-collection';
import { EntityInfo } from '../../entity-info';
import { Nullable } from '../../nullable';
import { AttributesObject } from './core/attributes-object';
import { DocumentObject } from './core/document-object';
import { RelationshipsObject } from './core/relationships-object';
import { ResourceIdentifierObject } from './core/resource-identifier-object';
import { ResourceObject } from './core/resource-object';
import { JsonApiResourceMetadata } from './json-api-resource-metadata';

/**
 * Represents json api adapter to build document objects from entities and back.
 * 
 * @type {JsonApiAdapter}
 */
export class JsonApiAdapter
{
    /**
     * Builds document object from entity collection.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * @param {EntityCollection<TEntity>} entityCollection Entity collection.
     * 
     * @returns {DocumentObject} Document object.
     */
    public buildEntityCollectionDocumentObject<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, entityCollection: EntityCollection<TEntity>): DocumentObject
    {
        const resourceObjects = new Array<ResourceObject>();

        for (const entity of entityCollection)
        {
            const documentObject = this.buildEntityResourceObject(typeMetadata, entity);

            resourceObjects.push(documentObject);
        }

        return { data: resourceObjects };
    }

    public buildEntityResourceObject<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, entity: TEntity): ResourceObject
    {
        const serializerContext = new SerializerContext<TEntity>({} as any); // TODO: Define serializer context;
        const serializedEntity = serializerContext.serialize(entity);
        const jsonApiResourceMetadata = {} as JsonApiResourceMetadata; // TODO: Get metadata.

        const resourceObject = { type: jsonApiResourceMetadata.type } as ResourceObject;
        const attributesObject = {} as AttributesObject;
        const relationshipsObject = {} as RelationshipsObject;

        for (const propertyMetadata of typeMetadata.propertyMetadataMap.values())
        {
            if (propertyMetadata.serializationConfigured && !propertyMetadata.serializable)
            {
                continue;
            }

            const namingConvention = propertyMetadata.namingConvention ?? typeMetadata.namingConvention;
            const propertyNameByConvention = namingConvention ? namingConvention.convert(propertyMetadata.propertyName) : propertyMetadata.propertyName;
            const propertyName = propertyMetadata.alias ?? propertyNameByConvention;
            const propertyValue = serializedEntity[propertyName];

            if (Fn.isUndefined(propertyValue))
            {
                continue;
            }

            if (propertyName === 'id')
            {
                resourceObject.id = propertyValue;

                continue;
            }

            // TODO: If other resource object -> build resource identifier object and attach to relationships.
            if (propertyName === 'id')
            {
                relationshipsObject[propertyName] = propertyValue;

                continue;
            }

            attributesObject[propertyName] = propertyValue;
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

    public buildEntityDocumentObject<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, entity: TEntity): DocumentObject
    {
        const serializerContext = new SerializerContext<TEntity>({} as any); // TODO: Define serializer context;
        const serializedEntity = serializerContext.serialize(entity);
        const jsonApiResourceMetadata = {} as JsonApiResourceMetadata; // TODO: Get metadata.

        const resourceObject = { type: jsonApiResourceMetadata.type } as ResourceObject;
        const attributesObject = {} as AttributesObject;
        const relationshipsObject = {} as RelationshipsObject;

        for (const propertyMetadata of typeMetadata.propertyMetadataMap.values())
        {
            if (propertyMetadata.serializationConfigured && !propertyMetadata.serializable)
            {
                continue;
            }

            const namingConvention = propertyMetadata.namingConvention ?? typeMetadata.namingConvention;
            const propertyNameByConvention = namingConvention ? namingConvention.convert(propertyMetadata.propertyName) : propertyMetadata.propertyName;
            const propertyName = propertyMetadata.alias ?? propertyNameByConvention;
            const propertyValue = serializedEntity[propertyName];

            if (Fn.isUndefined(propertyValue))
            {
                continue;
            }

            if (propertyName === 'id')
            {
                resourceObject.id = propertyValue;

                continue;
            }

            // TODO: If other resource object -> build resource identifier object and attach to relationships.
            if (propertyName === 'id')
            {
                relationshipsObject[propertyName] = propertyValue;

                continue;
            }

            attributesObject[propertyName] = propertyValue;
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

    public buildDocumentObjectEntityCollection<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, documentObject: DocumentObject): EntityCollection<TEntity>
    {
        throw new Error();
    }

    public buildDocumentObjectEntity<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, documentObject: DocumentObject): Nullable<TEntity>
    {
        throw new Error();
    }

    private defineSerializerContext<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, x: any): SerializerContext<TEntity>
    {
        return new SerializerContext({
            $: x,
            path: '$',
            typeMetadata: typeMetadata,
            referenceCallbackMap: new WeakMap<ReferenceKey, ReferenceCallback[]>(),
            referenceMap: new WeakMap<ReferenceKey, ReferenceValue>()
        });
    }
}