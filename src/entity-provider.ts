import { BatchDeleteCommand } from './commands/batch-delete-command';
import { BatchUpdateCommand } from './commands/batch-update-command';
import { BulkCreateCommand } from './commands/bulk-create-command';
import { BulkDeleteCommand } from './commands/bulk-delete-command';
import { BulkQueryCommand } from './commands/bulk-query-command';
import { BulkSaveCommand } from './commands/bulk-save-command';
import { BulkUpdateCommand } from './commands/bulk-update-command';
import { CreateCommand } from './commands/create-command';
import { DeleteCommand } from './commands/delete-command';
import { QueryCommand } from './commands/query-command';
import { SaveCommand } from './commands/save-command';
import { UpdateCommand } from './commands/update-command';
import { Entity } from './entity';
import { EntityCollection } from './entity-collection';
import { Nullable } from './nullable';

/**
 * Entity provider which executes passed commands.
 * 
 * @type {EntityProvider}
 */
export interface EntityProvider
{
    /**
     * Executes create command.
     * 
     * @param {CreateCommand<TEntity>} createCommand Create command.
     * 
     * @returns {Promise<TEntity>} Created entity.
     */
    executeCreateCommand<TEntity extends Entity>(createCommand: CreateCommand<TEntity>): Promise<TEntity>;

    /**
     * Executes bulk create command.
     * 
     * @param {BulkCreateCommand<TEntity>} bulkCreateCommand Bulk create command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Created entity collection.
     */
    executeBulkCreateCommand<TEntity extends Entity>(bulkCreateCommand: BulkCreateCommand<TEntity>): Promise<EntityCollection<TEntity>>;

    /**
     * Executes update command.
     * 
     * @param {CreateCommand<TEntity>} updateCommand Update command.
     * 
     * @returns {Promise<TEntity>} Updated entity.
     */
    executeUpdateCommand<TEntity extends Entity>(updateCommand: UpdateCommand<TEntity>): Promise<TEntity>;

    /**
     * Executes bulk update command.
     * 
     * @param {BulkUpdateCommand<TEntity>} bulkUpdateCommand Bulk update command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Updated entity collection.
     */
    executeBulkUpdateCommand<TEntity extends Entity>(bulkUpdateCommand: BulkUpdateCommand<TEntity>): Promise<EntityCollection<TEntity>>;

    /**
     * Executes batch update command.
     * 
     * @param {BatchUpdateCommand<TEntity>} batchUpdateCommand Batch update command.
     * 
     * @returns {Promise<void>} Promise to update an entity collection.
     */
    executeBatchUpdateCommand<TEntity extends Entity>(batchUpdateCommand: BatchUpdateCommand<TEntity>): Promise<void>;

    /**
     * Executes save command.
     * 
     * @param {SaveCommand<TEntity>} saveCommand Save command.
     * 
     * @returns {Promise<TEntity>} Saved entity.
     */
    executeSaveCommand<TEntity extends Entity>(saveCommand: SaveCommand<TEntity>): Promise<TEntity>;

    /**
     * Executes bulk save command.
     * 
     * @param {BulkSaveCommand<TEntity>} bulkSaveCommand Bulk save command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Saved entity collection.
     */
    executeBulkSaveCommand<TEntity extends Entity>(bulkSaveCommand: BulkSaveCommand<TEntity>): Promise<EntityCollection<TEntity>>;

    /**
     * Executes query command.
     * 
     * @param {QueryCommand<TEntity>} queryCommand Query command.
     * 
     * @returns {Promise<Nullable<TEntity>>} Entity or null.
     */
    executeQueryCommand<TEntity extends Entity>(queryCommand: QueryCommand<TEntity>): Promise<Nullable<TEntity>>;

    /**
     * Executes bulk query command.
     * 
     * @param {BulkQueryCommand<TEntity>} bulkQueryCommand Bulk query command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Queried entity collection.
     */
    executeBulkQueryCommand<TEntity extends Entity>(bulkQueryCommand: BulkQueryCommand<TEntity>): Promise<EntityCollection<TEntity>>;

    /**
     * Executes delete command.
     * 
     * @param {DeleteCommand<TEntity>} deleteCommand Delete command.
     * 
     * @returns {Promise<TEntity>} Deleted entity.
     */
    executeDeleteCommand<TEntity extends Entity>(deleteCommand: DeleteCommand<TEntity>): Promise<TEntity>;

    /**
     * Executes bulk delete command.
     * 
     * @param {BulkDeleteCommand<TEntity>} bulkDeleteCommand Bulk delete command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Deleted entity collection.
     */
    executeBulkDeleteCommand<TEntity extends Entity>(bulkDeleteCommand: BulkDeleteCommand<TEntity>): Promise<EntityCollection<TEntity>>;

    /**
     * Executes batch delete command.
     * 
     * @param {BatchDeleteCommand<TEntity>} batchDeleteCommand Batch delete command.
     * 
     * @returns {Promise<void>} Promise to delete an entity collection.
     */
    executeBatchDeleteCommand<TEntity extends Entity>(batchDeleteCommand: BatchDeleteCommand<TEntity>): Promise<void>;
}
