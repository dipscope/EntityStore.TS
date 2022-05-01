import { Fn } from '@dipscope/type-manager/core';

import { Entity } from '../../entity';
import { EntityInfo } from '../../entity-info';
import { JsonApiResourceOptions } from './json-api-resource-options';

/**
 * Json api resource metadata.
 * 
 * @type {JsonApiResourceMetadata}
 */
export class JsonApiResourceMetadata<TEntity extends Entity>
{
    /**
     * Entity info.
     * 
     * @type {EntityInfo<TEntity>}
     */
    public readonly entityInfo: EntityInfo<TEntity>;

    /**
     * Json api resource options.
     * 
     * @type {JsonApiResourceOptions}
     */
    public readonly jsonApiResourceOptions: JsonApiResourceOptions;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     * @param {JsonApiResourceOptions} jsonApiResourceOptions Json api resource options.
     */
    public constructor(entityInfo: EntityInfo<TEntity>, jsonApiResourceOptions: JsonApiResourceOptions)
    {
        this.entityInfo = entityInfo;
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
        return this.jsonApiResourceOptions.type ?? this.entityInfo.typeMetadata.typeName.toLowerCase();
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
