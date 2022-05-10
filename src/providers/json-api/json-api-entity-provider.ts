import { Fn } from '@dipscope/type-manager/core';

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
import { JsonApiNetExpressionVisitor } from './expression-visitors/json-api-net-expression-visitor';
import { JsonApiAdapter } from './json-api-adapter';
import { JsonApiConnection } from './json-api-connection';
import { JsonApiEntityProviderOptions } from './json-api-entity-provider-options';
import { JsonApiExpressionVisitor } from './json-api-expression-visitor';
import { JsonApiResourceManager } from './json-api-resource-manager';

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
     * Expression visitor used to transform entity store commands.
     * 
     * @type {JsonApiExpressionVisitor}
     */
    public readonly jsonApiExpressionVisitor: JsonApiExpressionVisitor;

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
        this.jsonApiExpressionVisitor = jsonApiEntityProviderOptions.jsonApiExpressionVisitor ?? new JsonApiNetExpressionVisitor();
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
        const jsonApiResourceMetadata = JsonApiResourceManager.extractJsonApiResourceMetadataFromTypeMetadata(typeMetadata);

        if (Fn.isNil(jsonApiResourceMetadata)) 
        {
            const entityName = typeMetadata.typeName;

            throw new Error(`${entityName}: json api resource metadata is not declared for an entity!`);
        }

        const linkObject = this.buildResourceLinkObject(jsonApiResourceMetadata.type);
        const requestEntity = createCommand.entity;
        const requestDocumentObject = this.jsonApiAdapter.buildEntityDocumentObject(typeMetadata, requestEntity);
        const responseDocumentObject = await this.jsonApiConnection.post(linkObject, requestDocumentObject);
        const responseEntity = this.jsonApiAdapter.buildDocumentObjectEntity(typeMetadata, responseDocumentObject);

        if (Fn.isNil(responseEntity))
        {
            const entityName = typeMetadata.typeName;

            throw new Error(`${entityName}: response for resource creation returned empty result!`);
        }

        return responseEntity;
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
        const entityPromises = new Array<Promise<TEntity>>();
        const entityInfo = bulkCreateCommand.entityInfo;

        for (const entity of bulkCreateCommand.entityCollection) 
        {
            const createCommand = new CreateCommand<TEntity>(entityInfo, entity);
            const entityPromise = this.executeCreateCommand(createCommand);

            entityPromises.push(entityPromise);
        }

        const entities = await Promise.all(entityPromises);
        const entityCollection = new EntityCollection<TEntity>(entities);

        return entityCollection;
    }

    /**
     * Executes update command.
     * 
     * @param {CreateCommand<TEntity>} updateCommand Update command.
     * 
     * @returns {Promise<TEntity>} Updated entity.
     */
    public executeUpdateCommand<TEntity extends Entity>(updateCommand: UpdateCommand<TEntity>): Promise<TEntity>
    {
        throw new Error('Not implemented');
    }

    /**
     * Executes bulk update command.
     * 
     * @param {BulkUpdateCommand<TEntity>} bulkUpdateCommand Bulk update command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Updated entity collection.
     */
    public executeBulkUpdateCommand<TEntity extends Entity>(bulkUpdateCommand: BulkUpdateCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        throw new Error('Not implemented');
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
        throw new Error('Not implemented');
    }

    /**
     * Executes save command.
     * 
     * @param {SaveCommand<TEntity>} saveCommand Save command.
     * 
     * @returns {Promise<TEntity>} Saved entity.
     */
    public executeSaveCommand<TEntity extends Entity>(saveCommand: SaveCommand<TEntity>): Promise<TEntity>
    {
        throw new Error('Not implemented');
    }

    /**
     * Executes bulk save command.
     * 
     * @param {BulkSaveCommand<TEntity>} bulkSaveCommand Bulk save command.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Saved entity collection.
     */
    public executeBulkSaveCommand<TEntity extends Entity>(bulkSaveCommand: BulkSaveCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        throw new Error('Not implemented');
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
    public executeBulkQueryCommand<TEntity extends Entity>(bulkQueryCommand: BulkQueryCommand<TEntity>): Promise<EntityCollection<TEntity>>
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
    public executeDeleteCommand<TEntity extends Entity>(deleteCommand: DeleteCommand<TEntity>): Promise<TEntity>
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
    public executeBulkDeleteCommand<TEntity extends Entity>(bulkDeleteCommand: BulkDeleteCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        throw new Error('Not implemented');
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
     * Builds resource link object.
     * 
     * @param {string} type Resource type.
     *  
     * @returns {LinkObject} Link object.
     */
    private buildResourceLinkObject(type: string): LinkObject
    {
        const linkObject = `${this.jsonApiConnection.baseUrl}/${type}`;

        return linkObject;
    }

    /**
     * Builds resource identifier link object.
     * 
     * @param {string} type Resource type.
     * @param {string} id Resource id.
     * 
     * @returns {LinkObject} Link object.
     */
    private buildResourceIdentifierLinkObject(type: string, id: string): LinkObject
    {
        const linkObject = `${this.buildResourceLinkObject(type)}/${id}`;

        return linkObject;
    }

    /**
     * Builds resource browse link object.
     * 
     * @param {string} type Resource type.
     * @param {BrowseCommand<any, any>} browseCommand Browse command.
     * 
     * @returns {LinkObject} Link object.
     */
    private buildResourceBrowseLinkObject(type: string, browseCommand: BrowseCommand<any, any>): LinkObject
    {
        let linkObject = this.buildResourceLinkObject(type);

        if (!Fn.isNil(browseCommand.filterExpression))
        {
            const symbol = '?';
            const filterQuery = browseCommand.filterExpression.accept(this.jsonApiExpressionVisitor);
            const filterPrefix = this.jsonApiExpressionVisitor.defineFilterPrefix();

            linkObject += `${symbol}${filterPrefix}${filterQuery}`;
        }

        if (!Fn.isNil(browseCommand.orderExpression))
        {
            const symbol = Fn.isNil(browseCommand.filterExpression) ? '?' : '&';
            const orderQuery = browseCommand.orderExpression.accept(this.jsonApiExpressionVisitor);
            const orderPrefix = this.jsonApiExpressionVisitor.defineOrderPrefix();

            linkObject += `${symbol}${orderPrefix}${orderQuery}`;
        }

        if (!Fn.isNil(browseCommand.includeExpression))
        {
            const symbol = Fn.isNil(browseCommand.filterExpression) && Fn.isNil(browseCommand.orderExpression) ? '?' : '&';
            const includeQuery = browseCommand.includeExpression.accept(this.jsonApiExpressionVisitor);
            const includePrefix = this.jsonApiExpressionVisitor.defineIncludePrefix();

            linkObject += `${symbol}${includePrefix}${includeQuery}`;
        }

        // TODO: Pagination...
        // Page-based strategy might use query parameters such as page[number] and page[size], an offset-based strategy might use page[offset] and page[limit].
        // Cursor-based strategy might use page[cursor] and page[before], page[after] or other variants.

        // TODO: Encode URI?
        return linkObject;
    }
}
