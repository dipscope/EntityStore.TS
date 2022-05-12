import { CommandBuilder } from '../command-builder';
import { BulkCreateCommand } from '../commands/bulk-create-command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntitySet } from '../entity-set';

/**
 * Bulk create command builder.
 * 
 * @type {BulkCreateCommandBuilder<TEntity>}
 */
export class BulkCreateCommandBuilder<TEntity extends Entity> extends CommandBuilder<BulkCreateCommand<TEntity>, TEntity, EntityCollection<TEntity>>
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
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be created.
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
     * @returns {BulkCreateCommand<TEntity>} Bulk create command.
     */
    protected build(): BulkCreateCommand<TEntity>
    {
        return new BulkCreateCommand(this.entityInfo, this.entityCollection);
    }

    /**
     * Attaches entity collection for creation.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be created.
     * 
     * @returns {BulkCreateCommandBuilder<TEntity>} Bulk create command builder.
     */
    public attach(entityCollection: EntityCollection<TEntity>): BulkCreateCommandBuilder<TEntity> 
    {
        this.entityCollection = entityCollection;

        return this;
    }

    /**
     * Creates attached entity collection.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Updated entity collection.
     */
    public create(): Promise<EntityCollection<TEntity>> 
    {
        return this.build().delegate(this.entityProvider);
    }
}
