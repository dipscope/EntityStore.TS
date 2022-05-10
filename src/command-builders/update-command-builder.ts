import { Fn } from '@dipscope/type-manager/core';

import { CommandBuilder } from '../command-builder';
import { UpdateCommand } from '../commands/update-command';
import { Entity } from '../entity';
import { EntitySet } from '../entity-set';
import { EntityAttachError } from '../errors/entity-attach-error';

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
    protected entity?: TEntity;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     */
    public constructor(entitySet: EntitySet<TEntity>)
    {
        super(entitySet);

        return;
    }

    /**
     * Builds a command.
     * 
     * @returns {UpdateCommand<TEntity>} Update command.
     */
    protected build(): UpdateCommand<TEntity>
    {
        if (Fn.isNil(this.entity))
        {
            throw new EntityAttachError(this.entityInfo.typeMetadata.typeName);
        }

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
        return this.build().delegate(this.entitySet.entityProvider);
    }
}
