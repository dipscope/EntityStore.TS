import { Fn } from '@dipscope/type-manager/core';

import { CommandBuilder } from '../command-builder';
import { QueryCommand } from '../commands/query-command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntityInfo } from '../entity-info';
import { EntityInfoProxyRoot } from '../entity-info-proxy';
import { EntityInfoProxyHandler } from '../entity-info-proxy-handler';
import { EntitySet } from '../entity-set';
import { AndFilterExpression } from '../expressions/and-filter-expression';
import { FilterExpression } from '../expressions/filter-expression';
import { IncludeExpression } from '../expressions/include-expression';
import { OrderExpression } from '../expressions/order-expression';
import { FilterClause } from '../filter-clause';
import { FilterExpressionBuilder } from '../filter-expression-builder';
import { IncludeClause, IncludeCollectionClause } from '../include-clause';
import { OrderClause } from '../order-clause';
import { OrderDirection } from '../order-direction';
import { proxyTarget } from '../proxy-target';
import { IncludeQueryBuilder } from './include-query-command-builder';
import { OrderQueryCommandBuilder } from './order-query-command-builder';

/**
 * Query command builder.
 * 
 * @type {QueryCommandBuilder<TEntity>}
 */
export class QueryCommandBuilder<TEntity extends Entity> extends CommandBuilder<QueryCommand<TEntity>, EntityCollection<TEntity>> 
{
    /**
     * Entity set.
     * 
     * @type {EntitySet<TEntity>}
     */
    protected entitySet: EntitySet<TEntity>;

    /**
     * Entity info.
     * 
     * @type {EntityInfo<TEntity>}
     */
    protected entityInfo: EntityInfo<TEntity>;

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
        super();

        this.entitySet = entitySet;
        this.entityInfo = new EntityInfo(entitySet.typeMetadata);
        this.entityInfoProxyRoot = new Proxy<any>(this.entityInfo, new EntityInfoProxyHandler(entitySet.typeMetadata));
        this.filterExpressionBuilder = new FilterExpressionBuilder();

        return;
    }

    /**
     * Filters entity collection returned by the query.
     * 
     * @param {FilterClause<TEntity>} filterClause Filter clause.
     * 
     * @returns {QueryCommandBuilder<TEntity>} Query command builder.
     */
    public where(filterClause: FilterClause<TEntity>): QueryCommandBuilder<TEntity>
    {
        const filterExpression = filterClause(this.entityInfoProxyRoot, this.filterExpressionBuilder);

        this.filterExpression = Fn.isNil(this.filterExpression) ? filterExpression : new AndFilterExpression(this.filterExpression, filterExpression);

        return this;
    }

    /**
     * Orders entity collection returned by the query.
     * 
     * @param {OrderClause<TEntity, TProperty>} orderClause Order clause.
     * @param {OrderDirection} orderDirection Order direction.
     * 
     * @returns {OrderQueryCommandBuilder<TEntity>} Order query command builder.
     */
    public orderBy<TProperty>(orderClause: OrderClause<TEntity, TProperty>, orderDirection: OrderDirection = OrderDirection.Asc): OrderQueryCommandBuilder<TEntity> 
    {
        const propertyInfoProxy = orderClause(this.entityInfoProxyRoot);

        this.orderExpression = new OrderExpression(propertyInfoProxy[proxyTarget], orderDirection);

        return new OrderQueryCommandBuilder(this.entitySet, this.orderExpression, this.filterExpression, this.includeExpression, this.offset, this.limit);
    }

    /**
     * Orders entity collection returned by the query in ascending order.
     * 
     * @param {OrderClause<TEntity, TProperty>} orderClause Order clause.
     * 
     * @returns {OrderQueryCommandBuilder<TEntity>} Order query command builder.
     */
    public orderByAsc<TProperty>(orderClause: OrderClause<TEntity, TProperty>): OrderQueryCommandBuilder<TEntity>
    {
        return this.orderBy(orderClause, OrderDirection.Asc);
    }

    /**
     * Orders entity collection returned by the query in descending order.
     * 
     * @param {OrderClause<TEntity, TProperty>} orderClause Order clause.
     * 
     * @returns {OrderQueryCommandBuilder<TEntity>} Order query command builder.
     */
    public orderByDesc<TProperty>(orderClause: OrderClause<TEntity, TProperty>): OrderQueryCommandBuilder<TEntity>
    {
        return this.orderBy(orderClause, OrderDirection.Desc);
    }

    public include<TProperty>(includeClause: IncludeClause<TEntity, TProperty>): IncludeQueryCommandBuilder<TEntity, TProperty> 
    {

    }

    public includeCollection<TProperty>(includeCollectionClause: IncludeCollectionClause<TEntity, TProperty>): IncludeQueryCommandBuilder<TEntity, TProperty> 
    {
        
    }

    public skip(count: number): QueryBuilder<TEntity>
    {
        this.offset = count;

        return this;
    }

    public take(count: number): QueryBuilder<TEntity>
    {
        this.limit = count;

        return this;
    }

    public build(): Query<TEntity>
    {
        return new Query(this.entityInfo, this.whereExpressions, this.orderByExpressions, this.includeExpressions, this.offset, this.limit);
    }

   

    public findAll(): EntityCollection<TEntity>
    {

    }

    public findOne(): TEntity? 
    {

    }
}
