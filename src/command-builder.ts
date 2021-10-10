import { Command } from './command';
import { Entity } from './entity';
import { EntityInfo } from './entity-info';
import { EntitySet } from './entity-set';

/**
 * Command builder to build a certain command.
 * 
 * @type {CommandBuilder<TCommand, TResult>}
 */
export abstract class CommandBuilder<TCommand extends Command<TEntity, TResult>, TEntity extends Entity, TResult>
{
    /**
     * Entity set.
     * 
     * @type {EntitySet<TEntity>}
     */
    protected readonly entitySet: EntitySet<TEntity>;

    /**
     * Entity info.
     * 
     * @type {EntityInfo<TEntity>}
     */
    protected readonly entityInfo: EntityInfo<TEntity>;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     */
    public constructor(entitySet: EntitySet<TEntity>)
    {
        this.entitySet = entitySet;
        this.entityInfo = new EntityInfo(entitySet.typeMetadata);

        return;
    }

    /**
     * Builds a command.
     * 
     * @returns {TCommand} Command.
     */
    protected abstract build(): TCommand;
}
