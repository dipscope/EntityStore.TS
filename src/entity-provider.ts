import { AddCommand } from './commands/add-command';
import { BatchRemoveCommand } from './commands/batch-remove-command';
import { BatchUpdateCommand } from './commands/batch-update-command';
import { BulkAddCommand } from './commands/bulk-add-command';
import { BulkQueryCommand } from './commands/bulk-query-command';
import { BulkRemoveCommand } from './commands/bulk-remove-command';
import { BulkSaveCommand } from './commands/bulk-save-command';
import { BulkUpdateCommand } from './commands/bulk-update-command';
import { QueryCommand } from './commands/query-command';
import { RemoveCommand } from './commands/remove-command';
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
     * Executes add command.
     * 
     * @param {AddCommand<TEntity>} addCommand Add command.
     * 
     * @returns {Promise<TEntity>} Added entity.
     */
    executeAddCommand<TEntity extends Entity>(addCommand: AddCommand<TEntity>): Promise<TEntity>;

    /**
     * Executes bulk add command.
     * 
     * @param {BulkAddCommand<TEntity>} bulkAddCommand Bulk add command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Added entity collection.
     */
    executeBulkAddCommand<TEntity extends Entity>(bulkAddCommand: BulkAddCommand<TEntity>): Promise<EntityCollection<TEntity>>;

    /**
     * Executes update command.
     * 
     * @param {UpdateCommand<TEntity>} updateCommand Update command.
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
     * Executes remove command.
     * 
     * @param {RemoveCommand<TEntity>} removeCommand Remove command.
     * 
     * @returns {Promise<TEntity>} Removed entity.
     */
    executeRemoveCommand<TEntity extends Entity>(removeCommand: RemoveCommand<TEntity>): Promise<TEntity>;

    /**
     * Executes bulk remove command.
     * 
     * @param {BulkRemoveCommand<TEntity>} bulkRemoveCommand Bulk remove command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Removed entity collection.
     */
    executeBulkRemoveCommand<TEntity extends Entity>(bulkRemoveCommand: BulkRemoveCommand<TEntity>): Promise<EntityCollection<TEntity>>;

    /**
     * Executes batch remove command.
     * 
     * @param {BatchRemoveCommand<TEntity>} batchRemoveCommand Batch remove command.
     * 
     * @returns {Promise<void>} Promise to remove an entity collection.
     */
    executeBatchRemoveCommand<TEntity extends Entity>(batchRemoveCommand: BatchRemoveCommand<TEntity>): Promise<void>;
}
