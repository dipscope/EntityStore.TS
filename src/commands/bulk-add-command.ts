import { Command } from '../command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';

/**
 * Command to add an entity collection.
 * 
 * @type {BulkAddCommand<TEntity>}
 */
export class BulkAddCommand<TEntity extends Entity> extends Command<TEntity, EntityCollection<TEntity>>
{
    /**
     * Entity collection which should be added.
     * 
     * @type {EntityCollection<TEntity>}
     */
    public readonly entityCollection: EntityCollection<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be added.
     */
    public constructor(entityInfo: EntityInfo<TEntity>, entityCollection: EntityCollection<TEntity>)
    {
        super(entityInfo);

        this.entityCollection = entityCollection;

        return;
    }

    /**
     * Delegates command execution to an entity provider.
     * 
     * @param {EntityProvider} entityProvider Entity provider.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Result of command execution.
     */
    public delegate(entityProvider: EntityProvider): Promise<EntityCollection<TEntity>>
    {
        return entityProvider.executeBulkAddCommand(this);
    }
}
