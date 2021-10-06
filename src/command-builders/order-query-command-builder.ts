import { Entity } from '../entity';
import { EntitySet } from '../entity-set';
import { FilterExpression } from '../expressions/filter-expression';
import { IncludeExpression } from '../expressions/include-expression';
import { OrderExpression } from '../expressions/order-expression';
import { OrderClause } from '../order-clause';
import { OrderDirection } from '../order-direction';
import { proxyTarget } from '../proxy-target';
import { QueryCommandBuilder } from './query-command-builder';

/**
 * Order query command builder.
 * 
 * @type {OrderQueryCommandBuilder<TEntity>}
 */
export class OrderQueryCommandBuilder<TEntity extends Entity> extends QueryCommandBuilder<TEntity> 
{
    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {OrderExpression} orderExpression Order expression.
     * @param {FilterExpression} filterExpression Filter expression.
     * @param {IncludeExpression} includeExpression Include expression.
     * @param {number} offset Offset.
     * @param {number} limit Limit.
     */
    public constructor(
        entitySet: EntitySet<TEntity>,
        orderExpression: OrderExpression,
        filterExpression?: FilterExpression,
        includeExpression?: IncludeExpression,
        offset?: number,
        limit?: number
    )
    {
        super(entitySet);

        this.filterExpression = filterExpression;
        this.orderExpression = orderExpression;
        this.includeExpression = includeExpression;
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
    public thenBy<TProperty>(orderClause: OrderClause<TEntity, TProperty>, orderDirection: OrderDirection = OrderDirection.Asc): OrderQueryCommandBuilder<TEntity>
    {
        const propertyInfoProxy = orderClause(this.entityInfoProxyRoot);

        this.orderExpression = new OrderExpression(propertyInfoProxy[proxyTarget], orderDirection, this.orderExpression);

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
