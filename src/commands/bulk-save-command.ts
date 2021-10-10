import { Command } from '../command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';

/**
 * Command to save an entity collection.
 * 
 * @type {BulkSaveCommand<TEntity>}
 */
export class BulkSaveCommand<TEntity extends Entity> extends Command<TEntity, EntityCollection<TEntity>>
{
    /**
     * Entity collection which should be saved.
     * 
     * @type {EntityCollection<TEntity>}
     */
    public readonly entityCollection: EntityCollection<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be saved.
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
        return entityProvider.executeBulkSaveCommand(this);
    }
}
