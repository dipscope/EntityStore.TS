import { Fn } from '@dipscope/type-manager/core';

import { CommandBuilder } from '../command-builder';
import { BulkDeleteCommand } from '../commands/bulk-delete-command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntitySet } from '../entity-set';
import { EntityCollectionAttachError } from '../errors/entity-collection-attach-error';

/**
 * Bulk delete command builder.
 * 
 * @type {BulkDeleteCommandBuilder<TEntity>}
 */
export class BulkDeleteCommandBuilder<TEntity extends Entity> extends CommandBuilder<BulkDeleteCommand<TEntity>, TEntity, EntityCollection<TEntity>>
{
    /**
     * Entity collection which should be deleted.
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
     * @returns {BulkDeleteCommand<TEntity>} Bulk delete command.
     */
    protected build(): BulkDeleteCommand<TEntity>
    {
        if (Fn.isNil(this.entityCollection))
        {
            throw new EntityCollectionAttachError(this.entityInfo.typeMetadata.typeName);
        }
        
        return new BulkDeleteCommand(this.entityInfo, this.entityCollection);
    }

    /**
     * Attaches entity collection for delete.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be deleted.
     * 
     * @returns {BulkDeleteCommandBuilder<TEntity>} Bulk delete command builder.
     */
    public attach(entityCollection: EntityCollection<TEntity>): BulkDeleteCommandBuilder<TEntity> 
    {
        this.entityCollection = entityCollection;

        return this;
    }

    /**
     * Deletes attached entity collection.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Deleted entity collection.
     */
    public delete(): Promise<EntityCollection<TEntity>> 
    {
        return this.build().delegate(this.entitySet.entityProvider);
    }
}
