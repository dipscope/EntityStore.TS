import { EntityProvider } from './entity-provider';
import { EntitySet } from './entity-set';
import { EntityStoreOptions } from './entity-store-options';

export class EntityStore 
{
    public readonly entityStoreOptions: EntityStoreOptions;

    public constructor(entityStoreOptions: EntityStoreOptions) 
    {
        this.entityStoreOptions = entityStoreOptions;

        return;
    }

    public createEntitySet<TEntity>() 
    {
        return new EntitySet<TEntity>()
    }
}

