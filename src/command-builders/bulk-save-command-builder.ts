import { Fn } from '@dipscope/type-manager/core';

import { CommandBuilder } from '../command-builder';
import { BulkSaveCommand } from '../commands/bulk-save-command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntitySet } from '../entity-set';
import { EntityCollectionAttachError } from '../errors/entity-collection-attach-error';

/**
 * Bulk save command builder.
 * 
 * @type {BulkSaveCommandBuilder<TEntity>}
 */
export class BulkSaveCommandBuilder<TEntity extends Entity> extends CommandBuilder<BulkSaveCommand<TEntity>, TEntity, EntityCollection<TEntity>>
{
    /**
     * Entity collection which should be saved.
     * 
     * @type {EntityCollection<TEntity>}
     */
    protected entityCollection?: EntityCollection<TEntity>;

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
     * @returns {BulkSaveCommand<TEntity>} Bulk save command.
     */
    protected build(): BulkSaveCommand<TEntity>
    {
        if (Fn.isNil(this.entityCollection))
        {
            throw new EntityCollectionAttachError(this.entityInfo.typeMetadata.typeName);
        }
        
        return new BulkSaveCommand(this.entityInfo, this.entityCollection);
    }

    /**
     * Attaches entity collection for save.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be saved.
     * 
     * @returns {BulkSaveCommandBuilder<TEntity>} Bulk save command builder.
     */
    public attach(entityCollection: EntityCollection<TEntity>): BulkSaveCommandBuilder<TEntity> 
    {
        this.entityCollection = entityCollection;

        return this;
    }

    /**
     * Saves attached entity collection.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Saved entity collection.
     */
    public save(): Promise<EntityCollection<TEntity>> 
    {
        return this.build().delegate(this.entitySet.entityProvider);
    }
}
