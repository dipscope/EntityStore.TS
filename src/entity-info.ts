import { TypeMetadata } from '@dipscope/type-manager/core';

import { Entity } from './entity';

/**
 * Class to provide information about certain entity.
 * 
 * @type {EntityInfo<TEntity>}
 */
export class EntityInfo<TEntity extends Entity>
{
    /**
     * Type metadata of an entity.
     * 
     * @type {TypeMetadata<TEntity>}
     */
    public readonly typeMetadata: TypeMetadata<TEntity>;

    /**
     * Constructor.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata of an entity.
     */
    public constructor(typeMetadata: TypeMetadata<TEntity>)
    {
        this.typeMetadata = typeMetadata;

        return;
    }
}
