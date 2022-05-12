import { CommandBuilder } from '../command-builder';
import { BulkSaveCommand } from '../commands/bulk-save-command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntitySet } from '../entity-set';

/**
 * Bulk save command builder.
 * 
 * @type {BulkSaveCommandBuilder<TEntity>}
 */
export class BulkSaveCommandBuilder<TEntity extends Entity> extends CommandBuilder<BulkSaveCommand<TEntity>, TEntity, EntityCollection<TEntity>>
{
    /**
     * Entity collection which should be saved.
     * 
     * @type {EntityCollection<TEntity>}
     */
    protected entityCollection: EntityCollection<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be saved.
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
     * @returns {BulkSaveCommand<TEntity>} Bulk save command.
     */
    protected build(): BulkSaveCommand<TEntity>
    {
        return new BulkSaveCommand(this.entityInfo, this.entityCollection);
    }

    /**
     * Attaches entity collection for save.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be saved.
     * 
     * @returns {BulkSaveCommandBuilder<TEntity>} Bulk save command builder.
     */
    public attach(entityCollection: EntityCollection<TEntity>): BulkSaveCommandBuilder<TEntity> 
    {
        this.entityCollection = entityCollection;

        return this;
    }

    /**
     * Saves attached entity collection.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Saved entity collection.
     */
    public save(): Promise<EntityCollection<TEntity>> 
    {
        return this.build().delegate(this.entityProvider);
    }
}
