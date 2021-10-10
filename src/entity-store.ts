import { TypeManager } from '@dipscope/type-manager';
import { TypeCtor } from '@dipscope/type-manager/core';

import { Entity } from './entity';
import { EntitySet } from './entity-set';
import { EntityStoreOptions } from './entity-store-options';

/**
 * The main class to describe available entity sets. This class must be derived and
 * extended on the client side.
 * 
 * @type {EntityStore}
 */
export abstract class EntityStore 
{
    /**
     * Current entity store options.
     * 
     * @type {EntityStoreOptions}
     */
    public readonly entityStoreOptions: EntityStoreOptions;

    /**
     * Constructor.
     * 
     * @param {EntityStoreOptions} entityStoreOptions Entity store options.
     */
    public constructor(entityStoreOptions: EntityStoreOptions) 
    {
        this.entityStoreOptions = entityStoreOptions;

        return;
    }

    /**
     * Creates entity set.
     * 
     * @param {TypeCtor<TEntity>} typeCtor Type constructor of an entity.
     * 
     * @returns {EntitySet<TEntity>} Entity set for provided type.
     */
    public createEntitySet<TEntity extends Entity>(typeCtor: TypeCtor<TEntity>): EntitySet<TEntity>
    {
        const typeMetadata = TypeManager.extractTypeMetadata(typeCtor);

        return new EntitySet<TEntity>(typeMetadata, this.entityStoreOptions.entityProvider);
    }
}
