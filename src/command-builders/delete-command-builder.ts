import { CommandBuilder } from '../command-builder';
import { DeleteCommand } from '../commands/delete-command';
import { Entity } from '../entity';
import { EntitySet } from '../entity-set';

/**
 * Delete command builder.
 * 
 * @type {DeleteCommandBuilder<TEntity>}
 */
export class DeleteCommandBuilder<TEntity extends Entity> extends CommandBuilder<DeleteCommand<TEntity>, TEntity, TEntity>
{
    /**
     * Entity which should be deleted.
     * 
     * @type {TEntity}
     */
    protected entity: TEntity;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {TEntity} entity Entity which should be deleted.
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
     * @returns {DeleteCommand<TEntity>} Delete command.
     */
    protected build(): DeleteCommand<TEntity>
    {
        return new DeleteCommand(this.entityInfo, this.entity);
    }

    /**
     * Attaches entity for delete.
     * 
     * @param {TEntity} entity Entity which should be deleted.
     * 
     * @returns {DeleteCommandBuilder<TEntity>} Delete command builder.
     */
    public attach(entity: TEntity): DeleteCommandBuilder<TEntity> 
    {
        this.entity = entity;

        return this;
    }
    
    /**
     * Deletes attached entity.
     * 
     * @returns {Promise<TEntity>} Deleted entity.
     */
    public delete(): Promise<TEntity> 
    {
        return this.build().delegate(this.entityProvider);
    }
}
