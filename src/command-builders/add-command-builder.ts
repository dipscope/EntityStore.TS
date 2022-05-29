import { CommandBuilder } from '../command-builder';
import { AddCommand } from '../commands/add-command';
import { Entity } from '../entity';
import { EntitySet } from '../entity-set';

/**
 * Add command builder.
 * 
 * @type {AddCommandBuilder<TEntity>}
 */
export class AddCommandBuilder<TEntity extends Entity> extends CommandBuilder<AddCommand<TEntity>, TEntity, TEntity>
{
    /**
     * Entity which should be added.
     * 
     * @type {TEntity}
     */
    protected entity: TEntity;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {TEntity} entity Entity which should be added.
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
     * @returns {AddCommand<TEntity>} Add command.
     */
    public build(): AddCommand<TEntity>
    {
        return new AddCommand(this.entityInfo, this.entity);
    }

    /**
     * Attaches entity for creation.
     * 
     * @param {TEntity} entity Entity which should be added.
     * 
     * @returns {AddCommandBuilder<TEntity>} Add command builder.
     */
    public attach(entity: TEntity): AddCommandBuilder<TEntity> 
    {
        this.entity = entity;

        return this;
    }
    
    /**
     * Adds attached entity.
     * 
     * @returns {Promise<TEntity>} Added entity.
     */
    public add(): Promise<TEntity> 
    {
        return this.build().delegate(this.entityProvider);
    }
}
