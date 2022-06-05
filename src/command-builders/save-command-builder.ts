import { CommandBuilder } from '../command-builder';
import { SaveCommand } from '../commands/save-command';
import { Entity } from '../entity';
import { EntitySet } from '../entity-set';

/**
 * Save command builder.
 *
 * @type {SaveCommandBuilder<TEntity>}
 */
export class SaveCommandBuilder<TEntity extends Entity> extends CommandBuilder<SaveCommand<TEntity>, TEntity, TEntity>
{
    /**
     * Entity which should be saved.
     *
     * @type {TEntity}
     */
    protected entity: TEntity;

    /**
     * Constructor.
     *
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {TEntity} entity Entity which should be saved.
     */
    public constructor(entitySet: EntitySet<TEntity>, entity: TEntity)
    {
        super(entitySet);

        this.entity = entity;

        return;
    }

    /**
     * Builds a command.
     *
     * @returns {SaveCommand<TEntity>} Save command.
     */
    public build(): SaveCommand<TEntity>
    {
        return new SaveCommand(this.entityInfo, this.entity);
    }

    /**
     * Attaches entity for save.
     *
     * @param {TEntity} entity Entity which should be saved.
     *
     * @returns {SaveCommandBuilder<TEntity>} Save command builder.
     */
    public attach(entity: TEntity): SaveCommandBuilder<TEntity>
    {
        this.entity = entity;

        return this;
    }

    /**
     * Saves attached entity.
     *
     * @returns {Promise<TEntity>} Saved entity.
     */
    public save(): Promise<TEntity>
    {
        return this.build().delegate(this.entityProvider);
    }
}
