import { Entity } from '../entity';
import { EntitySet } from '../entity-set';
import { FilterExpression } from '../filter-expressions/filter-expression';
import { IncludeExpression } from '../filter-expressions/include-expression';
import { OrderExpression } from '../filter-expressions/order-expression';
import { proxyTargetSymbol } from '../proxy-target-symbol';
import { SortClause } from '../sort-clause';
import { SortDirection } from '../sort-direction';
import { BrowseCommandBuilder } from './browse-command-builder';

/**
 * Order browse command builder.
 * 
 * @type {OrderBrowseCommandBuilder<TEntity>}
 */
export class OrderBrowseCommandBuilder<TEntity extends Entity> extends BrowseCommandBuilder<TEntity> 
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
     * @param {SortClause<TEntity, TProperty>} orderClause Order clause.
     * @param {SortDirection} orderDirection Order direction.
     * 
     * @returns {OrderBrowseCommandBuilder<TEntity>} Order browse command builder.
     */
    public thenBy<TProperty>(orderClause: SortClause<TEntity, TProperty>, orderDirection: SortDirection = SortDirection.Asc): OrderBrowseCommandBuilder<TEntity>
    {
        const propertyInfoProxy = orderClause(this.entityInfoProxyRoot);

        this.orderExpression = new OrderExpression(propertyInfoProxy[proxyTargetSymbol], orderDirection, this.orderExpression);

        return this;
    }

    /**
     * Applies ascending child order for an entity collection.
     * 
     * @param {SortClause<TEntity, TProperty>} orderClause Order clause.
     * 
     * @returns {OrderBrowseCommandBuilder<TEntity>} Order browse command builder.
     */
    public thenByAsc<TProperty>(orderClause: SortClause<TEntity, TProperty>): OrderBrowseCommandBuilder<TEntity> 
    {
        return this.thenBy(orderClause, SortDirection.Asc)
    }

    /**
     * Applies descending child order for an entity collection.
     * 
     * @param {SortClause<TEntity, TProperty>} orderClause Order clause.
     * 
     * @returns {OrderBrowseCommandBuilder<TEntity>} Order browse command builder.
     */
    public thenByDesc<TProperty>(orderClause: SortClause<TEntity, TProperty>): OrderBrowseCommandBuilder<TEntity> 
    {
        return this.thenBy(orderClause, SortDirection.Desc);
    }
}
