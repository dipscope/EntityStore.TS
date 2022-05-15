import { Fn, TypeMetadata } from '@dipscope/type-manager/core';

import { BatchDeleteCommand } from '../../commands/batch-delete-command';
import { BatchUpdateCommand } from '../../commands/batch-update-command';
import { BrowseCommand } from '../../commands/browse-command';
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
import { LinkObject } from './core/link-object';
import { JsonApiNetFilterExpressionVisitor } from './filter-expression-visitors/json-api-net-filter-expression-visitor';
import { JsonApiAdapter } from './json-api-adapter';
import { JsonApiConnection } from './json-api-connection';
import { JsonApiEntityProviderOptions } from './json-api-entity-provider-options';
import { JsonApiFilterExpressionVisitor } from './json-api-filter-expression-visitor';
import { JsonApiIncludeExpressionVisitor } from './json-api-include-expression-visitor';
import { JsonApiPaginateExpressionVisitor } from './json-api-paginate-expression-visitor';
import { JsonApiSortExpressionVisitor } from './json-api-sort-expression-visitor';
import { OffsetBasedPaginateExpressionVisitor } from './paginate-expression-visitors/offset-based-paginate-expression-visitor';

/**
 * Json api implementation of entity provider.
 * 
 * @type {JsonApiEntityProvider}
 */
export class JsonApiEntityProvider implements EntityProvider 
{
    /**
     * Connection to json api.
     * 
     * @type {JsonApiConnection}
     */
    public readonly jsonApiConnection: JsonApiConnection;

    /**
     * Filter expression visitor used to transform entity store commands.
     * 
     * @type {JsonApiFilterExpressionVisitor}
     */
    public readonly jsonApiFilterExpressionVisitor: JsonApiFilterExpressionVisitor;

    /**
     * Paginate expression visitor used to transform entity store commands.
     * 
     * @type {JsonApiPaginateExpressionVisitor}
     */
    public readonly jsonApiPaginateExpressionVisitor: JsonApiPaginateExpressionVisitor;

    /**
     * Sort expression visitor used to transform entity store commands.
     * 
     * @type {JsonApiSortExpressionVisitor}
     */
    public readonly jsonApiSortExpressionVisitor: JsonApiSortExpressionVisitor;
    
    /**
     * Include expression visitor used to transform entity store commands.
     * 
     * @type {JsonApiIncludeExpressionVisitor}
     */
    public readonly jsonApiIncludeExpressionVisitor: JsonApiIncludeExpressionVisitor;

    /**
     * Json api adapter to transform entities to propper document objects and back.
     * 
     * @type {JsonApiAdapter}
     */
    public readonly jsonApiAdapter: JsonApiAdapter;

    /**
     * Constructor.
     * 
     * @param {JsonApiEntityProviderOptions} jsonApiEntityProviderOptions Json api entity provider options.
     */
    public constructor(jsonApiEntityProviderOptions: JsonApiEntityProviderOptions)
    {
        const defaultJsonApiRequestInterceptor = (request: Request) => request;
        const jsonApiRequestInterceptor = jsonApiEntityProviderOptions.jsonApiRequestInterceptor ?? defaultJsonApiRequestInterceptor;

        this.jsonApiConnection = new JsonApiConnection(jsonApiEntityProviderOptions.baseUrl, jsonApiRequestInterceptor);
        this.jsonApiFilterExpressionVisitor = jsonApiEntityProviderOptions.jsonApiFilterExpressionVisitor ?? new JsonApiNetFilterExpressionVisitor();
        this.jsonApiPaginateExpressionVisitor = jsonApiEntityProviderOptions.jsonApiPaginateExpressionVisitor ?? new OffsetBasedPaginateExpressionVisitor();
        this.jsonApiSortExpressionVisitor = new JsonApiSortExpressionVisitor();
        this.jsonApiIncludeExpressionVisitor = new JsonApiIncludeExpressionVisitor();
        this.jsonApiAdapter = new JsonApiAdapter();
        
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
        const typeMetadata = createCommand.entityInfo.typeMetadata;
        const requestEntity = createCommand.entity;
        const requestDocumentObject = this.jsonApiAdapter.createEntityDocumentObject(typeMetadata, requestEntity);
        const linkObject = this.createResourceLinkObject(typeMetadata);
        const responseDocumentObject = await this.jsonApiConnection.post(linkObject, requestDocumentObject);
        const responseEntity = this.jsonApiAdapter.createDocumentObjectEntity(typeMetadata, responseDocumentObject);

        return responseEntity ?? requestEntity;
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
        const typeMetadata = updateCommand.entityInfo.typeMetadata;
        const requestEntity = updateCommand.entity;
        const requestDocumentObject = this.jsonApiAdapter.createEntityDocumentObject(typeMetadata, requestEntity);
        const linkObject = this.createResourceIdentifierLinkObject(typeMetadata, requestEntity.id);
        const responseDocumentObject = await this.jsonApiConnection.patch(linkObject, requestDocumentObject);
        const responseEntity = this.jsonApiAdapter.createDocumentObjectEntity(typeMetadata, responseDocumentObject);

        return responseEntity ?? requestEntity;
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
    public executeBatchUpdateCommand<TEntity extends Entity>(batchUpdateCommand: BatchUpdateCommand<TEntity>): Promise<void>
    {
        throw new Error('Not supported');
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
        const entityInfo = saveCommand.entityInfo;
        const entity = saveCommand.entity;

        if (Fn.isNil(entity.id)) 
        {
            const createCommand = new CreateCommand(entityInfo, entity);

            return await this.executeCreateCommand(createCommand);
        }

        const updateCommand = new UpdateCommand(entityInfo, entity);

        return await this.executeUpdateCommand(updateCommand);
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
        const typeMetadata = bulkQueryCommand.entityInfo.typeMetadata;
        const linkObject = this.createResourceBrowseLinkObject(typeMetadata, bulkQueryCommand);
        const responseDocumentObject = await this.jsonApiConnection.get(linkObject);
        const responseEntityCollection = this.jsonApiAdapter.createDocumentObjectEntityCollection(typeMetadata, responseDocumentObject);

        return responseEntityCollection;
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
        const typeMetadata = deleteCommand.entityInfo.typeMetadata;
        const requestEntity = deleteCommand.entity;
        const linkObject = this.createResourceIdentifierLinkObject(typeMetadata, requestEntity.id);

        await this.jsonApiConnection.delete(linkObject);

        return requestEntity;
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
        throw new Error('Not supported');
    }
    
    /**
     * Creates resource link object.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     *  
     * @returns {LinkObject} Link object.
     */
    private createResourceLinkObject<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>): LinkObject
    {
        const jsonApiResourceMetadata = this.jsonApiAdapter.extractJsonApiResourceMetadataOrThrow(typeMetadata);
        const linkObject = `${this.jsonApiConnection.baseUrl}/${jsonApiResourceMetadata.type}`;

        return linkObject;
    }

    /**
     * Creates resource identifier link object.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * @param {string} id Resource id.
     * 
     * @returns {LinkObject} Link object.
     */
    private createResourceIdentifierLinkObject<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, id: string): LinkObject
    {
        const linkObject = `${this.createResourceLinkObject(typeMetadata)}/${id}`;

        return linkObject;
    }

    /**
     * Creates resource browse link object.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Type metadata.
     * @param {BrowseCommand<any, any>} browseCommand Browse command.
     * 
     * @returns {LinkObject} Link object.
     */
    private createResourceBrowseLinkObject<TEntity extends Entity>(typeMetadata: TypeMetadata<TEntity>, browseCommand: BrowseCommand<any, any>): LinkObject
    {
        let linkObject = this.createResourceLinkObject(typeMetadata);

        if (!Fn.isNil(browseCommand.filterExpression))
        {
            const symbol = '?';
            const filterPrefix = this.jsonApiFilterExpressionVisitor.prefix;
            const filterQuery = browseCommand.filterExpression.accept(this.jsonApiFilterExpressionVisitor);

            linkObject += `${symbol}${filterPrefix}${filterQuery}`;
        }

        if (!Fn.isNil(browseCommand.sortExpression))
        {
            const symbol = Fn.isNil(browseCommand.filterExpression) ? '?' : '&';
            const sortPrefix = this.jsonApiSortExpressionVisitor.prefix;
            const sortQuery = browseCommand.sortExpression.accept(this.jsonApiSortExpressionVisitor);

            linkObject += `${symbol}${sortPrefix}${sortQuery}`;
        }

        if (!Fn.isNil(browseCommand.includeExpression))
        {
            const symbol = Fn.isNil(browseCommand.filterExpression) && Fn.isNil(browseCommand.sortExpression) ? '?' : '&';
            const includePrefix = this.jsonApiIncludeExpressionVisitor.prefix;
            const includeQuery = browseCommand.includeExpression.accept(this.jsonApiIncludeExpressionVisitor);

            linkObject += `${symbol}${includePrefix}${includeQuery}`;
        }

        if (!Fn.isNil(browseCommand.paginateExpression))
        {
            const symbol = Fn.isNil(browseCommand.filterExpression) && Fn.isNil(browseCommand.sortExpression) && Fn.isNil(browseCommand.includeExpression) ? '?' : '&';
            const pagePrefix = this.jsonApiPaginateExpressionVisitor.prefix;
            const pageQuery = browseCommand.paginateExpression.accept(this.jsonApiPaginateExpressionVisitor);

            linkObject += `${symbol}${pagePrefix}${pageQuery}`;
        }
        
        return linkObject;
    }
}
