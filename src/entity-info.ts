import { TypeMetadata } from '@dipscope/type-manager/core';

/**
 * Class to provide information about certain entity.
 * 
 * @type {EntityInfo<TEntity>}
 */
export class EntityInfo<TEntity>
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
