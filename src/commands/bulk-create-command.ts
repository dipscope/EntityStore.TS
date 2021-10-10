import { Command } from '../command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';

/**
 * Command to create an entity collection.
 * 
 * @type {BulkCreateCommand<TEntity>}
 */
export class BulkCreateCommand<TEntity extends Entity> extends Command<TEntity, EntityCollection<TEntity>>
{
    /**
     * Entity collection which should be created.
     * 
     * @type {EntityCollection<TEntity>}
     */
    public readonly entityCollection: EntityCollection<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be created.
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
        return entityProvider.executeBulkCreateCommand(this);
    }
}
