import { Entity } from '../entity';
import { EntitySet } from '../entity-set';
import { FilterExpression } from '../filter-expression';
import { IncludeExpression } from '../include-expression';
import { PaginateExpression } from '../paginate-expression';
import { proxyTargetSymbol } from '../proxy-target-symbol';
import { SortClause } from '../sort-clause';
import { SortExpression } from '../sort-expression';
import { AscSortExpression } from '../sort-expressions/asc-sort-expression';
import { DescSortExpression } from '../sort-expressions/desc-sort-expression';
import { BrowseCommandBuilder } from './browse-command-builder';

/**
 * Sort browse command builder.
 * 
 * @type {SortBrowseCommandBuilder<TEntity>}
 */
export class SortBrowseCommandBuilder<TEntity extends Entity> extends BrowseCommandBuilder<TEntity> 
{
    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {SortExpression} sortExpression Sort expressions.
     * @param {FilterExpression} filterExpression Filter expression.
     * @param {IncludeExpression} includeExpression Include expression.
     * @param {PaginateExpression} paginateExpression Paginate expression.
     */
    public constructor(
        entitySet: EntitySet<TEntity>,
        sortExpression: SortExpression,
        filterExpression?: FilterExpression,
        includeExpression?: IncludeExpression,
        paginateExpression?: PaginateExpression
    )
    {
        super(entitySet);

        this.sortExpression = sortExpression;
        this.filterExpression = filterExpression;
        this.includeExpression = includeExpression;
        this.paginateExpression = paginateExpression;

        return;
    }

    /**
     * Applies ascending child sort for an entity collection.
     * 
     * @param {SortClause<TEntity, TProperty>} sortClause Sort clause.
     * 
     * @returns {SortBrowseCommandBuilder<TEntity>} Sort browse command builder.
     */
    public thenByAsc<TProperty>(sortClause: SortClause<TEntity, TProperty>): SortBrowseCommandBuilder<TEntity> 
    {
        const propertyInfoProxy = sortClause(this.entityInfoProxyRoot);

        this.sortExpression = new AscSortExpression(propertyInfoProxy[proxyTargetSymbol], this.sortExpression);

        return this;
    }

    /**
     * Applies descending child sort for an entity collection.
     * 
     * @param {SortClause<TEntity, TProperty>} sortClause Sort clause.
     * 
     * @returns {SortBrowseCommandBuilder<TEntity>} Sort browse command builder.
     */
    public thenByDesc<TProperty>(sortClause: SortClause<TEntity, TProperty>): SortBrowseCommandBuilder<TEntity> 
    {
        const propertyInfoProxy = sortClause(this.entityInfoProxyRoot);

        this.sortExpression = new DescSortExpression(propertyInfoProxy[proxyTargetSymbol], this.sortExpression);

        return this;
    }
}
