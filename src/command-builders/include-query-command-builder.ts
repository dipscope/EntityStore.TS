import { Entity } from '../entity';
import { EntitySet } from '../entity-set';
import { EagerLoadingExpression } from '../expressions/eager-loading-expression';
import { FilterExpression } from '../expressions/filter-expression';
import { IncludeExpression } from '../expressions/include-expression';
import { OrderExpression } from '../expressions/order-expression';
import { ThenIncludeClause } from '../include-clause';
import { OrderClause } from '../order-clause';
import { OrderDirection } from '../order-direction';
import { PropertyInfo } from '../property-info';
import { PropertyInfoProxyRoot } from '../property-info-proxy';
import { PropertyInfoProxyHandler } from '../property-info-proxy-handler';
import { proxyTarget } from '../proxy-target';
import { QueryCommandBuilder } from './query-command-builder';

/**
 * Include query command builder.
 * 
 * @type {IncludeQueryCommandBuilder<TEntity>}
 */
export class IncludeQueryCommandBuilder<TEntity extends Entity, TProperty extends Entity> extends QueryCommandBuilder<TEntity> 
{
    /**
     * Property info.
     * 
     * @type {PropertyInfo<TProperty>}
     */
    protected propertyInfo: PropertyInfo<TProperty>;

    /**
     * Proxy root for attached property info.
     * 
     * @type {PropertyInfoProxyRoot<TEntity>}
     */
    protected propertyInfoProxyRoot: PropertyInfoProxyRoot<TProperty>;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {PropertyInfo<TProperty>} propertyInfo Property info.
     * @param {IncludeExpression} includeExpression Include expression.
     * @param {OrderExpression} orderExpression Order expression.
     * @param {FilterExpression} filterExpression Filter expression.
     * @param {number} offset Offset.
     * @param {number} limit Limit.
     */
    public constructor(
        entitySet: EntitySet<TEntity>,
        propertyInfo: PropertyInfo<TProperty>,
        includeExpression: IncludeExpression,
        orderExpression?: OrderExpression,
        filterExpression?: FilterExpression,
        offset?: number,
        limit?: number
    )
    {
        super(entitySet);

        this.propertyInfo = propertyInfo;
        this.propertyInfoProxyRoot = new Proxy<any>(propertyInfo, new PropertyInfoProxyHandler(propertyInfo.typeMetadata));
        this.includeExpression = includeExpression;
        this.filterExpression = filterExpression;
        this.orderExpression = orderExpression;
        this.offset = offset;
        this.limit = limit;

        return;
    }

    /**
     * Applies child order for an entity collection.
     * 
     * @param {OrderClause<TEntity, TProperty>} orderClause Order clause.
     * @param {OrderDirection} orderDirection Order direction.
     * 
     * @returns {OrderQueryCommandBuilder<TEntity>} Order query command builder.
     */
    public thenInclude<TChildProperty>(thenIncludeClause: ThenIncludeClause<TProperty, TChildProperty>): IncludeQueryCommandBuilder<TEntity, TChildProperty>
    {
        const propertyInfoProxy = thenIncludeClause(this.propertyInfoProxyRoot);

        this.includeExpression = new EagerLoadingExpression(propertyInfoProxy[proxyTarget], this.includeExpression);

        return this;
    }

    /**
     * Applies ascending child order for an entity collection.
     * 
     * @param {OrderClause<TEntity, TProperty>} orderClause Order clause.
     * 
     * @returns {OrderQueryCommandBuilder<TEntity>} Order query command builder.
     */
    public thenByAsc<TProperty>(orderClause: OrderClause<TEntity, TProperty>): OrderQueryCommandBuilder<TEntity> 
    {
        return this.thenBy(orderClause, OrderDirection.Asc)
    }

    /**
     * Applies descending child order for an entity collection.
     * 
     * @param {OrderClause<TEntity, TProperty>} orderClause Order clause.
     * 
     * @returns {OrderQueryCommandBuilder<TEntity>} Order query command builder.
     */
    public thenByDesc<TProperty>(orderClause: OrderClause<TEntity, TProperty>): OrderQueryCommandBuilder<TEntity> 
    {
        return this.thenBy(orderClause, OrderDirection.Desc);
    }
}
