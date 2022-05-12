import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';
import { FilterExpression } from '../filter-expression';
import { IncludeExpression } from '../include-expression';
import { PaginateExpression } from '../paginate-expression';
import { SortExpression } from '../sort-expression';
import { BrowseCommand } from './browse-command';

/**
 * Command to query an entity collection.
 * 
 * @type {BulkQueryCommand<TEntity>}
 */
export class BulkQueryCommand<TEntity extends Entity> extends BrowseCommand<TEntity, EntityCollection<TEntity>>
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
     * @returns {Promise<EntityCollection<TEntity>>} Result of command execution.
     */
    public delegate(entityProvider: EntityProvider): Promise<EntityCollection<TEntity>>
    {
        return entityProvider.executeBulkQueryCommand(this);
    }
}
