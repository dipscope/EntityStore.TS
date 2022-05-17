import { Command } from '../command';
import { Entity } from '../entity';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';

/**
 * Command to remove an entity.
 * 
 * @type {RemoveCommand<TEntity>}
 */
export class RemoveCommand<TEntity extends Entity> extends Command<TEntity, TEntity>
{
    /**
     * Entity which should be removed.
     * 
     * @type {TEntity}
     */
    public readonly entity: TEntity;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     * @param {TEntity} entity Entity which should be removed.
     */
    public constructor(entityInfo: EntityInfo<TEntity>, entity: TEntity)
    {
        super(entityInfo);
        
        this.entity = entity;

        return;
    }

    /**
     * Delegates command execution to an entity provider.
     * 
     * @param {EntityProvider} entityProvider Entity provider.
     * 
     * @returns {Promise<TEntity>} Result of command execution.
     */
    public delegate(entityProvider: EntityProvider): Promise<TEntity>
    {
        return entityProvider.executeRemoveCommand(this);
    }
}
