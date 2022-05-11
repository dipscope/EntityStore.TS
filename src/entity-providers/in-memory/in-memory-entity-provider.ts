import { Fn, TypeMetadata } from '@dipscope/type-manager/core';

import { BatchDeleteCommand } from '../../commands/batch-delete-command';
import { BatchUpdateCommand } from '../../commands/batch-update-command';
import { BulkCreateCommand } from '../../commands/bulk-create-command';
import { BulkDeleteCommand } from '../../commands/bulk-delete-command';
import { BulkQueryCommand } from '../../commands/bulk-query-command';
import { BulkSaveCommand } from '../../commands/bulk-save-command';
import { BulkUpdateCommand } from '../../commands/bulk-update-command';
import { CreateCommand } from '../../commands/create-command';
import { DeleteCommand } from '../../commands/delete-command';
import { QueryCommand } from '../../commands/query-command';
import { SaveCommand } from '../../commands/save-command';
import { UpdateCommand } from '../../commands/update-command';
import { Entity } from '../../entity';
import { EntityCollection } from '../../entity-collection';
import { EntityProvider } from '../../entity-provider';
import { Nullable } from '../../nullable';

/**
 * In memory implementation of entity provider.
 * 
 * @type {InMemoryEntityProvider}
 */
export class InMemoryEntityProvider implements EntityProvider 
{
    /**
     * Entity collection map.
     * 
     * @type {Map<TypeMetadata<Entity>, EntityCollection<Entity>>}
     */
    private readonly entityCollectionMap: Map<TypeMetadata<Entity>, EntityCollection<Entity>>;

    /**
     * Constructor.
     */
    public constructor()
    {
        this.entityCollectionMap = new Map<TypeMetadata<Entity>, EntityCollection<Entity>>();

        return;
    }

    /**
     * Executes create command.
     * 
     * @param {CreateCommand<TEntity>} createCommand Create command.
     * 
     * @returns {Promise<TEntity>} Created entity.
     */
    public async executeCreateCommand<TEntity extends Entity>(createCommand: CreateCommand<TEntity>): Promise<TEntity>
    {
        const entity = createCommand.entity;
        const typeMetadata = createCommand.entityInfo.typeMetadata;
        const entityCollection = this.defineEntityCollection(typeMetadata);

        entityCollection.push(entity)

        return entity;
    }

    /**
     * Executes bulk create command.
     * 
     * @param {BulkCreateCommand<TEntity>} bulkCreateCommand Bulk create command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Created entity collection.
     */
    public async executeBulkCreateCommand<TEntity extends Entity>(bulkCreateCommand: BulkCreateCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        const entityInfo = bulkCreateCommand.entityInfo;
        const requestEntityCollection = bulkCreateCommand.entityCollection;
        const responseEntityPromises = new Array<Promise<TEntity>>();

        for (const requestEntity of requestEntityCollection) 
        {
            const createCommand = new CreateCommand<TEntity>(entityInfo, requestEntity);
            const responseEntityPromise = this.executeCreateCommand(createCommand);

            responseEntityPromises.push(responseEntityPromise);
        }

        const responseEntities = await Promise.all(responseEntityPromises);
        const responseEntityCollection = new EntityCollection<TEntity>(responseEntities);

        return responseEntityCollection;
    }

    /**
     * Executes update command.
     * 
     * @param {CreateCommand<TEntity>} updateCommand Update command.
     * 
     * @returns {Promise<TEntity>} Updated entity.
     */
    public async executeUpdateCommand<TEntity extends Entity>(updateCommand: UpdateCommand<TEntity>): Promise<TEntity>
    {
        const entity = updateCommand.entity;
        const typeMetadata = updateCommand.entityInfo.typeMetadata;
        const entityCollection = this.defineEntityCollection(typeMetadata);
        const collectionEntity = entityCollection.find(e => e === entity);

        if (!Fn.isNil(collectionEntity))
        {
            Fn.assign(collectionEntity, entity);
        }
        
        return entity;
    }

    /**
     * Executes bulk update command.
     * 
     * @param {BulkUpdateCommand<TEntity>} bulkUpdateCommand Bulk update command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Updated entity collection.
     */
    public async executeBulkUpdateCommand<TEntity extends Entity>(bulkUpdateCommand: BulkUpdateCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        const entityInfo = bulkUpdateCommand.entityInfo;
        const requestEntityCollection = bulkUpdateCommand.entityCollection;
        const responseEntityPromises = new Array<Promise<TEntity>>();

        for (const requestEntity of requestEntityCollection) 
        {
            const updateCommand = new UpdateCommand<TEntity>(entityInfo, requestEntity);
            const responseEntityPromise = this.executeUpdateCommand(updateCommand);

            responseEntityPromises.push(responseEntityPromise);
        }

        const responseEntities = await Promise.all(responseEntityPromises);
        const responseEntityCollection = new EntityCollection<TEntity>(responseEntities);

        return responseEntityCollection;
    }

    /**
     * Executes batch update command.
     * 
     * @param {BatchUpdateCommand<TEntity>} batchUpdateCommand Batch update command.
     * 
     * @returns {Promise<void>} Promise to update an entity collection.
     */
    public async executeBatchUpdateCommand<TEntity extends Entity>(batchUpdateCommand: BatchUpdateCommand<TEntity>): Promise<void>
    {
        const entityPartial = batchUpdateCommand.entityPartial;
        const typeMetadata = batchUpdateCommand.entityInfo.typeMetadata;
        const entityCollection = this.defineEntityCollection(typeMetadata);

        for (const entity of entityCollection)
        {
            Fn.assign(entity, entityPartial);
        }

        return;
    }

    /**
     * Executes save command.
     * 
     * @param {SaveCommand<TEntity>} saveCommand Save command.
     * 
     * @returns {Promise<TEntity>} Saved entity.
     */
    public async executeSaveCommand<TEntity extends Entity>(saveCommand: SaveCommand<TEntity>): Promise<TEntity>
    {
        const entity = saveCommand.entity;
        const typeMetadata = saveCommand.entityInfo.typeMetadata;
        const entityCollection = this.defineEntityCollection(typeMetadata);
        const collectionEntity = entityCollection.find(e => e === entity);

        if (Fn.isNil(collectionEntity))
        {
            entityCollection.push(entity);

            return entity;
        }

        Fn.assign(collectionEntity, entity);
        
        return entity;
    }

    /**
     * Executes bulk save command.
     * 
     * @param {BulkSaveCommand<TEntity>} bulkSaveCommand Bulk save command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Saved entity collection.
     */
    public async executeBulkSaveCommand<TEntity extends Entity>(bulkSaveCommand: BulkSaveCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        const entityInfo = bulkSaveCommand.entityInfo;
        const requestEntityCollection = bulkSaveCommand.entityCollection;
        const responseEntityPromises = new Array<Promise<TEntity>>();

        for (const requestEntity of requestEntityCollection) 
        {
            const saveCommand = new SaveCommand<TEntity>(entityInfo, requestEntity);
            const responseEntityPromise = this.executeSaveCommand(saveCommand);

            responseEntityPromises.push(responseEntityPromise);
        }

        const responseEntities = await Promise.all(responseEntityPromises);
        const responseEntityCollection = new EntityCollection<TEntity>(responseEntities);

        return responseEntityCollection;
    }

    /**
     * Executes query command.
     * 
     * @param {QueryCommand<TEntity>} queryCommand Query command.
     * 
     * @returns {Promise<Nullable<TEntity>>} Entity or null.
     */
    public executeQueryCommand<TEntity extends Entity>(queryCommand: QueryCommand<TEntity>): Promise<Nullable<TEntity>>
    {
        throw new Error('Not implemented');
    }

    /**
     * Executes bulk query command.
     * 
     * @param {BulkQueryCommand<TEntity>} bulkQueryCommand Bulk query command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Queried entity collection.
     */
    public async executeBulkQueryCommand<TEntity extends Entity>(bulkQueryCommand: BulkQueryCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        throw new Error('Not implemented');
    }

    /**
     * Executes delete command.
     * 
     * @param {DeleteCommand<TEntity>} deleteCommand Delete command.
     * 
     * @returns {Promise<TEntity>} Deleted entity.
     */
    public async executeDeleteCommand<TEntity extends Entity>(deleteCommand: DeleteCommand<TEntity>): Promise<TEntity>
    {
        throw new Error('Not implemented');
    }

    /**
     * Executes bulk delete command.
     * 
     * @param {BulkDeleteCommand<TEntity>} bulkDeleteCommand Bulk delete command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Deleted entity collection.
     */
    public async executeBulkDeleteCommand<TEntity extends Entity>(bulkDeleteCommand: BulkDeleteCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        const entityInfo = bulkDeleteCommand.entityInfo;
        const requestEntityCollection = bulkDeleteCommand.entityCollection;
        const responseEntityPromises = new Array<Promise<TEntity>>();

        for (const requestEntity of requestEntityCollection) 
        {
            const deleteCommand = new DeleteCommand<TEntity>(entityInfo, requestEntity);
            const responseEntityPromise = this.executeDeleteCommand(deleteCommand);

            responseEntityPromises.push(responseEntityPromise);
        }

        const responseEntities = await Promise.all(responseEntityPromises);
        const responseEntityCollection = new EntityCollection<TEntity>(responseEntities);

        return responseEntityCollection;
    }

    /**
     * Executes batch delete command.
     * 
     * @param {BatchDeleteCommand<TEntity>} batchDeleteCommand Batch delete command.
     * 
     * @returns {Promise<void>} Promise to delete an entity collection.
     */
    public executeBatchDeleteCommand<TEntity extends Entity>(batchDeleteCommand: BatchDeleteCommand<TEntity>): Promise<void>
    {
        throw new Error('Not implemented');
    }

    /**
     * Defines entity collection for provided type metadata.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * 
     * @returns {EntityCollection<TEntity>} Entity collection for provided type metadata.
     */
    private defineEntityCollection<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>): EntityCollection<TEntity>
    {
        let entityCollection = this.entityCollectionMap.get(typeMetadata);

        if (Fn.isNil(entityCollection))
        {
            entityCollection = new EntityCollection<TEntity>();

            this.entityCollectionMap.set(typeMetadata, entityCollection);
        }

        return entityCollection;
    }
}
