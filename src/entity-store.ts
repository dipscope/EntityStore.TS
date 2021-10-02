import { EntityProvider } from './entity-provider';
import { EntitySet } from './entity-set';

export class EntityStore 
{
    public readonly entityProvider: EntityProvider;

    public constructor(entityProvider: EntityProvider) 
    {
        this.entityProvider = entityProvider;

        return;
    }

    public createEntitySet<TEntity>() 
    {
        return new EntitySet<TEntity>()
    }
}

