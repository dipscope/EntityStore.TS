import { CommandBuilder } from '../command-builder';
import { CreateCommand } from '../commands/create-command';
import { Entity } from '../entity';
import { EntitySet } from '../entity-set';

/**
 * Create command builder.
 * 
 * @type {CreateCommandBuilder<TEntity>}
 */
export class CreateCommandBuilder<TEntity extends Entity> extends CommandBuilder<CreateCommand<TEntity>, TEntity, TEntity>
{
    /**
     * Entity which should be created.
     * 
     * @type {TEntity}
     */
    protected entity: TEntity;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {TEntity} entity Entity which should be created.
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
     * @returns {CreateCommand<TEntity>} Create command.
     */
    protected build(): CreateCommand<TEntity>
    {
        return new CreateCommand(this.entityInfo, this.entity);
    }

    /**
     * Attaches entity for creation.
     * 
     * @param {TEntity} entity Entity which should be created.
     * 
     * @returns {CreateCommandBuilder<TEntity>} Create command builder.
     */
    public attach(entity: TEntity): CreateCommandBuilder<TEntity> 
    {
        this.entity = entity;

        return this;
    }
    
    /**
     * Creates attached entity.
     * 
     * @returns {Promise<TEntity>} Created entity.
     */
    public create(): Promise<TEntity> 
    {
        return this.build().delegate(this.entityProvider);
    }
}
