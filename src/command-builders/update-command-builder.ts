import { CommandBuilder } from '../command-builder';
import { UpdateCommand } from '../commands/update-command';
import { Entity } from '../entity';
import { EntitySet } from '../entity-set';

/**
 * Update command builder.
 * 
 * @type {UpdateCommandBuilder<TEntity>}
 */
export class UpdateCommandBuilder<TEntity extends Entity> extends CommandBuilder<UpdateCommand<TEntity>, TEntity, TEntity>
{
    /**
     * Entity which should be updated.
     * 
     * @type {TEntity}
     */
    protected entity: TEntity;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {TEntity} entity Entity which should be updated.
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
     * @returns {UpdateCommand<TEntity>} Update command.
     */
    public build(): UpdateCommand<TEntity>
    {
        return new UpdateCommand(this.entityInfo, this.entity);
    }

    /**
     * Attaches entity for update.
     * 
     * @param {TEntity} entity Entity which should be updated.
     * 
     * @returns {UpdateCommandBuilder<TEntity>} Update command builder.
     */
    public attach(entity: TEntity): UpdateCommandBuilder<TEntity> 
    {
        this.entity = entity;

        return this;
    }
    
    /**
     * Updates attached entity.
     * 
     * @returns {Promise<TEntity>} Updated entity.
     */
    public update(): Promise<TEntity> 
    {
        return this.build().delegate(this.entityProvider);
    }
}
