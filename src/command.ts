import { Entity } from './entity';
import { EntityInfo } from './entity-info';
import { EntityProvider } from './entity-provider';

/**
 * Command which can be executed over a certain entity provider.
 * 
 * @type {Command<TEntity, TResult>}
 */
export abstract class Command<TEntity extends Entity, TResult>
{
    /**
     * Entity info.
     * 
     * @type {EntityInfo<TEntity>}
     */
    public readonly entityInfo: EntityInfo<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     */
    public constructor(entityInfo: EntityInfo<TEntity>)
    {
        this.entityInfo = entityInfo;

        return;
    }

    /**
     * Delegates command execution to an entity provider.
     * 
     * @param {EntityProvider} entityProvider Entity provider.
     * 
     * @returns {Promise<TResult>} Result of command execution.
     */
    public abstract delegate(entityProvider: EntityProvider): Promise<TResult>;
}
