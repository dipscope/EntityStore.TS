import { Fn, TypeMetadata } from '@dipscope/type-manager/core';

import { Entity } from '../../entity';
import { JsonApiResourceOptions } from './json-api-resource-options';

/**
 * Json api resource metadata.
 * 
 * @type {JsonApiResourceMetadata}
 */
export class JsonApiResourceMetadata<TEntity extends Entity>
{
    /**
     * Type metadata.
     * 
     * @type {TypeMetadata<TEntity>}
     */
    public readonly typeMetadata: TypeMetadata<TEntity>;

    /**
     * Json api resource options.
     * 
     * @type {JsonApiResourceOptions}
     */
    public readonly jsonApiResourceOptions: JsonApiResourceOptions;

    /**
     * Constructor.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * @param {JsonApiResourceOptions} jsonApiResourceOptions Json api resource options.
     */
    public constructor(typeMetadata: TypeMetadata<TEntity>, jsonApiResourceOptions: JsonApiResourceOptions)
    {
        this.typeMetadata = typeMetadata;
        this.jsonApiResourceOptions = jsonApiResourceOptions;
        
        return;
    }

    /**
     * Gets resource type.
     * 
     * @returns {string} Resource type.
     */
    public get type(): string
    {
        return this.jsonApiResourceOptions.type ?? this.typeMetadata.typeName.toLowerCase();
    }

    /**
     * Configures json api resource metadata based on provided options.
     * 
     * @param {JsonApiResourceOptions} jsonApiResourceOptions Json api resource options.
     * 
     * @returns {JsonApiResourceMetadata<TEntity>} Current instance of json api resource metadata.
     */
    public configure(jsonApiResourceOptions: JsonApiResourceOptions): JsonApiResourceMetadata<TEntity>
    {
        if (!Fn.isUndefined(jsonApiResourceOptions.type))
        {
            this.jsonApiResourceOptions.type = jsonApiResourceOptions.type;
        }

        return this;
    }
}
