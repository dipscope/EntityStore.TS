import { CommandBuilder } from '../command-builder';
import { BulkUpdateCommand } from '../commands/bulk-update-command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntitySet } from '../entity-set';

/**
 * Bulk update command builder.
 * 
 * @type {BulkUpdateCommandBuilder<TEntity>}
 */
export class BulkUpdateCommandBuilder<TEntity extends Entity> extends CommandBuilder<BulkUpdateCommand<TEntity>, TEntity, EntityCollection<TEntity>>
{
    /**
     * Entity collection which should be updated.
     * 
     * @type {EntityCollection<TEntity>}
     */
    protected entityCollection: EntityCollection<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be updated.
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
     * @returns {BulkUpdateCommand<TEntity>} Bulk update command.
     */
    protected build(): BulkUpdateCommand<TEntity>
    {
        return new BulkUpdateCommand(this.entityInfo, this.entityCollection);
    }

    /**
     * Attaches entity collection for update.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be updated.
     * 
     * @returns {BulkUpdateCommandBuilder<TEntity>} Bulk update command builder.
     */
    public attach(entityCollection: EntityCollection<TEntity>): BulkUpdateCommandBuilder<TEntity> 
    {
        this.entityCollection = entityCollection;

        return this;
    }

    /**
     * Updates attached entity collection.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Updates entity collection.
     */
    public update(): Promise<EntityCollection<TEntity>> 
    {
        return this.build().delegate(this.entityProvider);
    }
}
