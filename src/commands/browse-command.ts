import { Command } from '../command';
import { Entity } from '../entity';
import { EntityInfo } from '../entity-info';
import { FilterExpression } from '../filter-expression';
import { IncludeExpression } from '../include-expression';
import { PaginateExpression } from '../paginate-expression';
import { SortExpression } from '../sort-expression';

/**
 * Command to browse an entity collection.
 * 
 * @type {BrowseCommand<TEntity, TResult>}
 */
export abstract class BrowseCommand<TEntity extends Entity, TResult> extends Command<TEntity, TResult>
{
    /**
     * Filter expression.
     * 
     * @type {FilterExpression}
     */
    public readonly filterExpression?: FilterExpression;

    /**
     * Sort expression.
     * 
     * @type {SortExpression}
     */
    public readonly sortExpression?: SortExpression;

    /**
     * Include expression.
     * 
     * @type {IncludeExpression}
     */
    public readonly includeExpression?: IncludeExpression;

    /**
     * Paginate expression.
     * 
     * @type {PaginateExpression}
     */
    public readonly paginateExpression?: PaginateExpression;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     * @param {FilterExpression} filterExpression Filter expression.
     * @param {SortExpression} sortExpression Sort expressions.
     * @param {IncludeExpression} includeExpression Include expression.
     * @param {PaginateExpression} paginateExpression Paginate expression.
     */
    public constructor(
        entityInfo: EntityInfo<TEntity>,
        filterExpression?: FilterExpression,
        sortExpression?: SortExpression,
        includeExpression?: IncludeExpression,
        paginateExpression?: PaginateExpression
    )
    {
        super(entityInfo);
        
        this.filterExpression = filterExpression;
        this.sortExpression = sortExpression;
        this.includeExpression = includeExpression;
        this.paginateExpression = paginateExpression;

        return;
    }
}
