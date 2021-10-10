import { Fn, PropertyMetadata, TypeMetadata } from '@dipscope/type-manager/core';

import { CommandBuilder } from '../command-builder';
import { BatchDeleteCommand } from '../commands/batch-delete-command';
import { BatchUpdateCommand } from '../commands/batch-update-command';
import { BrowseCommand } from '../commands/browse-command';
import { BulkQueryCommand } from '../commands/bulk-query-command';
import { QueryCommand } from '../commands/query-command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntityInfoProxyRoot } from '../entity-info-proxy';
import { EntityInfoProxyHandler } from '../entity-info-proxy-handler';
import { EntitySet } from '../entity-set';
import { AndFilterExpression } from '../expressions/and-filter-expression';
import { EagerLoadingExpression } from '../expressions/eager-loading-expression';
import { FilterExpression } from '../expressions/filter-expression';
import { IncludeExpression } from '../expressions/include-expression';
import { OrderExpression } from '../expressions/order-expression';
import { FilterClause } from '../filter-clause';
import { FilterExpressionBuilder } from '../filter-expression-builder';
import { IncludeClause, IncludeCollectionClause } from '../include-clause';
import { Nullable } from '../nullable';
import { OrderClause } from '../order-clause';
import { OrderDirection } from '../order-direction';
import { PropertyInfo } from '../property-info';
import { proxyTarget } from '../proxy-target';
import { IncludeBrowseCommandBuilder } from './include-browse-command-builder';
import { OrderBrowseCommandBuilder } from './order-browse-command-builder';

/**
 * Browse command builder.
 * 
 * @type {BrowseCommandBuilder<TEntity>}
 */
export class BrowseCommandBuilder<TEntity extends Entity> extends CommandBuilder<BrowseCommand<TEntity, unknown>, TEntity, unknown>
{
    /**
     * Proxy root for attached entity info.
     * 
     * @type {EntityInfoProxyRoot<TEntity>}
     */
    protected entityInfoProxyRoot: EntityInfoProxyRoot<TEntity>;

    /**
     * Expression builder to build filter expressions.
     * 
     * @type {FilterExpressionBuilder}
     */
    protected filterExpressionBuilder: FilterExpressionBuilder;

    /**
     * Current filter expression.
     * 
     * @type {FilterExpression}
     */
    protected filterExpression?: FilterExpression;

    /**
     * Current order expression.
     * 
     * @type {OrderExpression}
     */
    protected orderExpression?: OrderExpression;

    /**
     * Current include expression.
     * 
     * @type {IncludeExpression}
     */
    protected includeExpression?: IncludeExpression;

    /**
     * Current offset.
     * 
     * @type {number}
     */
    protected offset?: number;

    /**
     * Current limit.
     * 
     * @type {number}
     */
    protected limit?: number;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     */
    public constructor(entitySet: EntitySet<TEntity>)
    {
        super(entitySet);

        this.entityInfoProxyRoot = new Proxy<any>(this.entityInfo, new EntityInfoProxyHandler());
        this.filterExpressionBuilder = new FilterExpressionBuilder();

        return;
    }

    /**
     * Builds a command.
     * 
     * @returns {BulkQueryCommand<TEntity>} Bulk query command.
     */
    protected build(): BulkQueryCommand<TEntity>
    {
        return new BulkQueryCommand(this.entityInfo, this.filterExpression, this.orderExpression, this.includeExpression, this.offset, this.limit);
    }

    /**
     * Filters browsed entity collection.
     * 
     * @param {FilterClause<TEntity>} filterClause Filter clause.
     * 
     * @returns {BrowseCommandBuilder<TEntity>} Browse command builder.
     */
    public where(filterClause: FilterClause<TEntity>): BrowseCommandBuilder<TEntity>
    {
        const filterExpression = filterClause(this.entityInfoProxyRoot, this.filterExpressionBuilder);

        this.filterExpression = Fn.isNil(this.filterExpression) ? filterExpression : new AndFilterExpression(this.filterExpression, filterExpression);

        return this;
    }

    /**
     * Orders browsed entity collection.
     * 
     * @param {OrderClause<TEntity, TProperty>} orderClause Order clause.
     * @param {OrderDirection} orderDirection Order direction.
     * 
     * @returns {OrderBrowseCommandBuilder<TEntity>} Order browse command builder.
     */
    public orderBy<TProperty>(orderClause: OrderClause<TEntity, TProperty>, orderDirection: OrderDirection = OrderDirection.Asc): OrderBrowseCommandBuilder<TEntity> 
    {
        const propertyInfoProxy = orderClause(this.entityInfoProxyRoot);

        this.orderExpression = new OrderExpression(propertyInfoProxy[proxyTarget], orderDirection);

        return new OrderBrowseCommandBuilder(this.entitySet, this.orderExpression, this.filterExpression, this.includeExpression, this.offset, this.limit);
    }

    /**
     * Orders entity collection returned by the query in ascending order.
     * 
     * @param {OrderClause<TEntity, TProperty>} orderClause Order clause.
     * 
     * @returns {OrderBrowseCommandBuilder<TEntity>} Order browse command builder.
     */
    public orderByAsc<TProperty>(orderClause: OrderClause<TEntity, TProperty>): OrderBrowseCommandBuilder<TEntity>
    {
        return this.orderBy(orderClause, OrderDirection.Asc);
    }

    /**
     * Orders entity collection returned by the query in descending order.
     * 
     * @param {OrderClause<TEntity, TProperty>} orderClause Order clause.
     * 
     * @returns {OrderBrowseCommandBuilder<TEntity>} Order browse command builder.
     */
    public orderByDesc<TProperty>(orderClause: OrderClause<TEntity, TProperty>): OrderBrowseCommandBuilder<TEntity>
    {
        return this.orderBy(orderClause, OrderDirection.Desc);
    }

    /**
     * Includes entity for eager loading.
     * 
     * @param {IncludeClause<TEntity, TProperty>} includeClause Include clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TProperty>} Include browse command builder.
     */
    public include<TProperty>(includeClause: IncludeClause<TEntity, TProperty>): IncludeBrowseCommandBuilder<TEntity, TProperty> 
    {
        const propertyInfoProxy = includeClause(this.entityInfoProxyRoot);
        const propertyInfo = propertyInfoProxy[proxyTarget];

        this.includeExpression = new EagerLoadingExpression(propertyInfo, this.includeExpression);

        return new IncludeBrowseCommandBuilder(this.entitySet, propertyInfo, this.includeExpression, this.orderExpression, this.filterExpression, this.offset, this.limit);
    }

    /**
     * Includes entity collection for eager loading.
     * 
     * @param {IncludeCollectionClause<TEntity, TProperty>} includeCollectionClause Include collection clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TProperty>} Include browse command builder.
     */
    public includeCollection<TProperty>(includeCollectionClause: IncludeCollectionClause<TEntity, TProperty>): IncludeBrowseCommandBuilder<TEntity, TProperty> 
    {
        const propertyInfoProxy = includeCollectionClause(this.entityInfoProxyRoot);
        const collectionPropertyInfo = propertyInfoProxy[proxyTarget];
        const collectionPropertyMetadata = collectionPropertyInfo.propertyMetadata;
        const collectionGenericMetadatas = collectionPropertyMetadata.genericMetadatas;

        if (Fn.isNil(collectionGenericMetadatas) || Fn.isEmpty(collectionGenericMetadatas))
        {
            throw new Error(`${collectionPropertyInfo.path}: Cannot define generic metadata of an entity collection! This is usually caused by invalid configuration!`);
        }

        const propertyMetadata = collectionPropertyMetadata as PropertyMetadata<TEntity, any>;
        const entityTypeMetadata = collectionGenericMetadatas[0][0] as TypeMetadata<TProperty>;
        const propertyInfo = new PropertyInfo<TProperty>(collectionPropertyInfo.path, propertyMetadata, entityTypeMetadata, collectionPropertyInfo.parentPropertyInfo);

        this.includeExpression = new EagerLoadingExpression(collectionPropertyInfo, this.includeExpression);

        return new IncludeBrowseCommandBuilder(this.entitySet, propertyInfo, this.includeExpression, this.orderExpression, this.filterExpression, this.offset, this.limit);
    }

    /**
     * Skips a certain amount of entities.
     * 
     * @param {number} count Number of entities to skip.
     * 
     * @returns {BrowseCommandBuilder<TEntity>} Browse command builder.
     */
    public skip(count: number): BrowseCommandBuilder<TEntity>
    {
        this.offset = count;

        return this;
    }

    /**
     * Takes a certain amount of entities.
     * 
     * @param {number} count Number of entities to take.
     * 
     * @returns {BrowseCommandBuilder<TEntity>} Browse command builder.
     */
    public take(count: number): BrowseCommandBuilder<TEntity>
    {
        this.limit = count;

        return this;
    }
    
    /**
     * Finds all entities which match command expressions.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Entity collection.
     */
    public findAll(): Promise<EntityCollection<TEntity>>
    {
        return this.build().delegate(this.entitySet.entityProvider);
    }

    /**
     * Finds one entity which matches command expressions.
     * 
     * @returns {Promise<Nullable<TEntity>>} Entity or null when nothing matches.
     */
    public findOne(): Promise<Nullable<TEntity>>
    {
        const queryCommand = new QueryCommand(this.entityInfo, this.filterExpression, this.orderExpression, this.includeExpression, this.offset);

        return queryCommand.delegate(this.entitySet.entityProvider);
    }

    /**
     * Updates entities which matches command expressions.
     * 
     * @param {Partial<TEntity>} entityPartial Entity partial.
     * 
     * @returns {Promise<void>}
     */
    public update(entityPartial: Partial<TEntity>): Promise<void>
    {
        const batchUpdateCommand = new BatchUpdateCommand(this.entityInfo, entityPartial, this.filterExpression, this.orderExpression, this.includeExpression, this.offset, this.limit);

        return batchUpdateCommand.delegate(this.entitySet.entityProvider);
    }

    /**
     * Deletes entities which matches command expressions.
     * 
     * @returns {Promise<void>}
     */
    public delete(): Promise<void>
    {
        const batchDeleteCommand = new BatchDeleteCommand(this.entityInfo, this.filterExpression, this.orderExpression, this.includeExpression, this.offset, this.limit);

        return batchDeleteCommand.delegate(this.entitySet.entityProvider);
    }
}
