import { TypeCtor, TypeManager } from '@dipscope/type-manager';
import { Entity } from './entity';
import { EntityProvider } from './entity-provider';
import { EntitySet } from './entity-set';

/**
 * The main class to describe available entity sets. This class must be derived and
 * extended on the client side.
 * 
 * @type {EntityStore}
 */
export class EntityStore 
{
    /**
     * Attached entity provider.
     * 
     * @type {EntityProvider}
     */
    public readonly entityProvider: EntityProvider;

    /**
     * Constructor.
     * 
     * @param {EntityProvider} entityProvider Entity provider.
     */
    public constructor(entityProvider: EntityProvider) 
    {
        this.entityProvider = entityProvider;

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
        
        return new EntitySet<TEntity>(typeMetadata, this.entityProvider);
    }
}
