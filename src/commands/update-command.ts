import { Command } from '../command';
import { Entity } from '../entity';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';

/**
 * Command to update an entity.
 * 
 * @type {UpdateCommand<TEntity>}
 */
export class UpdateCommand<TEntity extends Entity> extends Command<TEntity, TEntity>
{
    /**
     * Entity which should be updated.
     * 
     * @type {TEntity}
     */
    public readonly entity: TEntity;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     * @param {TEntity} entity Entity which should be updated.
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
        return entityProvider.executeUpdateCommand(this);
    }
}
