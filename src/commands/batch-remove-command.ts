import { Entity } from '../entity';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';
import { FilterExpression } from '../filter-expression';
import { IncludeExpression } from '../include-expression';
import { PaginateExpression } from '../paginate-expression';
import { SortExpression } from '../sort-expression';
import { BrowseCommand } from './browse-command';

/**
 * Command to remove an entity collection based on expressions.
 * 
 * @type {BatchRemoveCommand<TEntity>}
 */
export class BatchRemoveCommand<TEntity extends Entity> extends BrowseCommand<TEntity, void>
{
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
        super(entityInfo, filterExpression, sortExpression, includeExpression, paginateExpression);

        return;
    }

    /**
     * Delegates command execution to an entity provider.
     * 
     * @param {EntityProvider} entityProvider Entity provider.
     * 
     * @returns {Promise<void>} Result of command execution.
     */
    public delegate(entityProvider: EntityProvider): Promise<void>
    {
        return entityProvider.executeBatchRemoveCommand(this);
    }
}
