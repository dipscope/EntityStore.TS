import { Entity } from '../entity';
import { EntityInfo } from '../entity-info';
import { EntityProvider } from '../entity-provider';
import { FilterExpression } from '../filter-expression';
import { IncludeExpression } from '../include-expression';
import { KeyValue } from '../key-value';
import { Nullable } from '../nullable';
import { PaginateExpression } from '../paginate-expression';
import { SortExpression } from '../sort-expression';
import { BrowseCommand } from './browse-command';

/**
 * Command to query an entity.
 * 
 * @type {QueryCommand<Nullable<TEntity>>}
 */
export class QueryCommand<TEntity extends Entity> extends BrowseCommand<TEntity, Nullable<TEntity>>
{
    /**
     * Key values.
     * 
     * @type {ReadonlyArray<KeyValue>}
     */
    public readonly keyValues: ReadonlyArray<KeyValue>;

    /**
     * Constructor.
     * 
     * @param {EntityInfo<TEntity>} entityInfo Entity info.
     * @param {ReadonlyArray<KeyValue>} keyValues Readonly array of key values.
     * @param {FilterExpression} filterExpression Filter expression.
     * @param {SortExpression} sortExpression Sort expressions.
     * @param {IncludeExpression} includeExpression Include expression.
     * @param {PaginateExpression} paginateExpression Paginate expression.
     */
    public constructor(
        entityInfo: EntityInfo<TEntity>, 
        keyValues: ReadonlyArray<KeyValue>,
        filterExpression?: FilterExpression,
        sortExpression?: SortExpression,
        includeExpression?: IncludeExpression,
        paginateExpression?: PaginateExpression
    )
    {
        super(entityInfo, filterExpression, sortExpression, includeExpression, paginateExpression);

        this.keyValues = keyValues;
        
        return;
    }
    
    /**
     * Delegates command execution to an entity provider.
     * 
     * @param {EntityProvider} entityProvider Entity provider.
     * 
     * @returns {Promise<Nullable<TEntity>>} Result of command execution.
     */
    public delegate(entityProvider: EntityProvider): Promise<Nullable<TEntity>>
    {
        return entityProvider.executeQueryCommand(this);
    }
}
