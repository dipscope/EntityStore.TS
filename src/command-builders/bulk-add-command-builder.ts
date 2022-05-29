import { CommandBuilder } from '../command-builder';
import { BulkAddCommand } from '../commands/bulk-add-command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntitySet } from '../entity-set';

/**
 * Bulk add command builder.
 * 
 * @type {BulkAddCommandBuilder<TEntity>}
 */
export class BulkAddCommandBuilder<TEntity extends Entity> extends CommandBuilder<BulkAddCommand<TEntity>, TEntity, EntityCollection<TEntity>>
{
    /**
     * Entity collection.
     * 
     * @type {EntityCollection<TEntity>}
     */
    protected entityCollection: EntityCollection<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be added.
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
     * @returns {BulkAddCommand<TEntity>} Bulk add command.
     */
    public build(): BulkAddCommand<TEntity>
    {
        return new BulkAddCommand(this.entityInfo, this.entityCollection);
    }

    /**
     * Attaches entity collection for creation.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be added.
     * 
     * @returns {BulkAddCommandBuilder<TEntity>} Bulk add command builder.
     */
    public attach(entityCollection: EntityCollection<TEntity>): BulkAddCommandBuilder<TEntity> 
    {
        this.entityCollection = entityCollection;

        return this;
    }

    /**
     * Adds attached entity collection.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Updated entity collection.
     */
    public add(): Promise<EntityCollection<TEntity>> 
    {
        return this.build().delegate(this.entityProvider);
    }
}
