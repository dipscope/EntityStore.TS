import { TypeManager } from '@dipscope/type-manager';
import { Fn, TypeFn, TypeMetadata } from '@dipscope/type-manager/core';

import { Entity } from '../../entity';
import { JsonApiResourceMetadata } from './json-api-resource-metadata';
import { jsonApiResourceMetadataKey } from './json-api-resource-metadata-key';
import { JsonApiResourceOptions } from './json-api-resource-options';

/**
 * Manager used to declare and extract json api resource metadata.
 * 
 * @type {JsonApiResourceManager}
 */
export class JsonApiResourceManager
{
    /**
     * Configures json api resource options map.
     * 
     * @param {Map<TypeFn<TEntity>, JsonApiResourceOptions>} jsonApiResourceOptionsMap Json api resource options map.
     * 
     * @returns {JsonApiResourceManager} Static instance of json api resource manager.
     */
    public static configureJsonApiResourceOptionsMap<TEntity extends Entity>(jsonApiResourceOptionsMap: Map<TypeFn<TEntity>, JsonApiResourceOptions>): typeof JsonApiResourceManager
    {
        for (const [typeFn, jsonApiResourceOptions] of jsonApiResourceOptionsMap)
        {
            this.configureJsonApiResourceOptions(typeFn, jsonApiResourceOptions);
        }

        return this;
    }

    /**
     * Configures json api resource options of a certain type.
     * 
     * @param {TypeFn<TEntity>} typeFn Type function.
     * @param {JsonApiResourceOptions} jsonApiResourceOptions Json api resource options.
     * 
     * @returns {JsonApiResourceManager} Static instance of json api resource manager.
     */
    public static configureJsonApiResourceOptions<TEntity extends Entity>(typeFn: TypeFn<TEntity>, jsonApiResourceOptions: JsonApiResourceOptions): typeof JsonApiResourceManager
    {
        this.defineJsonApiResourceMetadata(typeFn, jsonApiResourceOptions);

        return this;
    }
    
    /**
     * Defines json api resource metadata for provided type function.
     * 
     * @param {TypeFn<TEntity>} typeFn Type function.
     * @param {JsonApiResourceOptions} jsonApiResourceOptions Json api resource options.
     * 
     * @returns {JsonApiResourceMetadata<TEntity>} Json api resource metadata.
     */
    public static defineJsonApiResourceMetadata<TEntity extends Entity>(typeFn: TypeFn<TEntity>, jsonApiResourceOptions?: JsonApiResourceOptions): JsonApiResourceMetadata<TEntity>
    {
        const typeMetadata = TypeManager.defineTypeMetadata(typeFn);
        const jsonApiResourceMetadata = this.defineJsonApiResourceMetadataForTypeMetadata(typeMetadata, jsonApiResourceOptions);

        return jsonApiResourceMetadata;
    }

    /**
     * Defines json api resource metadata for provided type metadata.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * @param {JsonApiResourceOptions} jsonApiResourceOptions Json api resource options.
     * 
     * @returns {JsonApiResourceMetadata<TEntity>} Defined json api resource metadata.
     */
    public static defineJsonApiResourceMetadataForTypeMetadata<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, jsonApiResourceOptions?: JsonApiResourceOptions): JsonApiResourceMetadata<TEntity>
    {
        const customData = typeMetadata.typeOptions.customData ?? {};
        const jsonApiResourceMetadata = customData[jsonApiResourceMetadataKey] as JsonApiResourceMetadata<TEntity> ?? new JsonApiResourceMetadata(typeMetadata, {});

        if (!Fn.isNil(jsonApiResourceOptions))
        {
            jsonApiResourceMetadata.configure(jsonApiResourceOptions);
        }

        typeMetadata.configure({
            customData: { [jsonApiResourceMetadataKey]: jsonApiResourceMetadata }
        });

        return jsonApiResourceMetadata;
    }

    /**
     * Extracts json api resource metadata from provided type function.
     * 
     * @param {TypeFn<TEntity>} typeFn Type function.
     * 
     * @returns {JsonApiResourceMetadata<TEntity>|undefined} Json api resource metadata or undefined if not declared.
     */
    public static extractJsonApiResourceMetadata<TEntity extends Entity>(typeFn: TypeFn<TEntity>): JsonApiResourceMetadata<TEntity> | undefined
    {
        const typeMetadata = TypeManager.extractTypeMetadata(typeFn);
        const jsonApiResourceMetadata = this.extractJsonApiResourceMetadataFromTypeMetadata(typeMetadata);

        return jsonApiResourceMetadata;
    }

    /**
     * Extracts json api resource metadata from provided type metadata.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * 
     * @returns {JsonApiResourceMetadata<TEntity>|undefined} Json api resource metadata or undefined if not declared.
     */
    public static extractJsonApiResourceMetadataFromTypeMetadata<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>): JsonApiResourceMetadata<TEntity> | undefined
    {
        const customData = typeMetadata.typeOptions.customData ?? {};
        const jsonApiResourceMetadata = customData[jsonApiResourceMetadataKey] as JsonApiResourceMetadata<TEntity>;

        return jsonApiResourceMetadata;
    }
}
