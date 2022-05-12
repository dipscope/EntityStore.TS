import { CommandBuilder } from '../command-builder';
import { BulkDeleteCommand } from '../commands/bulk-delete-command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntitySet } from '../entity-set';

/**
 * Bulk delete command builder.
 * 
 * @type {BulkDeleteCommandBuilder<TEntity>}
 */
export class BulkDeleteCommandBuilder<TEntity extends Entity> extends CommandBuilder<BulkDeleteCommand<TEntity>, TEntity, EntityCollection<TEntity>>
{
    /**
     * Entity collection which should be deleted.
     * 
     * @type {EntityCollection<TEntity>}
     */
    protected entityCollection: EntityCollection<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be deleted.
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
     * @returns {BulkDeleteCommand<TEntity>} Bulk delete command.
     */
    protected build(): BulkDeleteCommand<TEntity>
    {
        return new BulkDeleteCommand(this.entityInfo, this.entityCollection);
    }

    /**
     * Attaches entity collection for delete.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be deleted.
     * 
     * @returns {BulkDeleteCommandBuilder<TEntity>} Bulk delete command builder.
     */
    public attach(entityCollection: EntityCollection<TEntity>): BulkDeleteCommandBuilder<TEntity> 
    {
        this.entityCollection = entityCollection;

        return this;
    }

    /**
     * Deletes attached entity collection.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Deleted entity collection.
     */
    public delete(): Promise<EntityCollection<TEntity>> 
    {
        return this.build().delegate(this.entityProvider);
    }
}
