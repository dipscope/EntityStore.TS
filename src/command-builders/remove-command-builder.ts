import { CommandBuilder } from '../command-builder';
import { RemoveCommand } from '../commands/remove-command';
import { Entity } from '../entity';
import { EntitySet } from '../entity-set';

/**
 * Remove command builder.
 *
 * @type {RemoveCommandBuilder<TEntity>}
 */
export class RemoveCommandBuilder<TEntity extends Entity> extends CommandBuilder<RemoveCommand<TEntity>, TEntity, TEntity>
{
    /**
     * Entity which should be removed.
     *
     * @type {TEntity}
     */
    protected entity: TEntity;

    /**
     * Constructor.
     *
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {TEntity} entity Entity which should be removed.
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
     * @returns {RemoveCommand<TEntity>} Remove command.
     */
    public build(): RemoveCommand<TEntity>
    {
        return new RemoveCommand(this.entityInfo, this.entity);
    }

    /**
     * Attaches entity for remove.
     *
     * @param {TEntity} entity Entity which should be removed.
     *
     * @returns {RemoveCommandBuilder<TEntity>} Remove command builder.
     */
    public attach(entity: TEntity): RemoveCommandBuilder<TEntity>
    {
        this.entity = entity;

        return this;
    }

    /**
     * Removes attached entity.
     *
     * @returns {Promise<TEntity>} Removed entity.
     */
    public remove(): Promise<TEntity>
    {
        return this.build().delegate(this.entityProvider);
    }
}
