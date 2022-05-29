import { CommandBuilder } from '../command-builder';
import { BulkRemoveCommand } from '../commands/bulk-remove-command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntitySet } from '../entity-set';

/**
 * Bulk remove command builder.
 * 
 * @type {BulkRemoveCommandBuilder<TEntity>}
 */
export class BulkRemoveCommandBuilder<TEntity extends Entity> extends CommandBuilder<BulkRemoveCommand<TEntity>, TEntity, EntityCollection<TEntity>>
{
    /**
     * Entity collection which should be removed.
     * 
     * @type {EntityCollection<TEntity>}
     */
    protected entityCollection: EntityCollection<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be removed.
     */
    public constructor(entitySet: EntitySet<TEntity>, entityCollection: EntityCollection<TEntity>)
    {
        super(entitySet);

        this.entityCollection = entityCollection;

        return;
    }

    /**
     * Builds a command.
     * 
     * @returns {BulkRemoveCommand<TEntity>} Bulk remove command.
     */
    public build(): BulkRemoveCommand<TEntity>
    {
        return new BulkRemoveCommand(this.entityInfo, this.entityCollection);
    }

    /**
     * Attaches entity collection for remove.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be removed.
     * 
     * @returns {BulkRemoveCommandBuilder<TEntity>} Bulk remove command builder.
     */
    public attach(entityCollection: EntityCollection<TEntity>): BulkRemoveCommandBuilder<TEntity> 
    {
        this.entityCollection = entityCollection;

        return this;
    }

    /**
     * Removes attached entity collection.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Removed entity collection.
     */
    public remove(): Promise<EntityCollection<TEntity>> 
    {
        return this.build().delegate(this.entityProvider);
    }
}
