import { BrowseCommand } from '../commands/browse-command';
import { Entity } from '../entity';
import { FilterClause } from '../filter-clause';
import { IncludeClause, IncludeCollectionClause } from '../include-clause';
import { KeyValue } from '../key-value';
import { Nullable } from '../nullable';
import { PaginateClause } from '../paginate-clause';
import { PaginatedEntityCollection } from '../paginated-entity-collection';
import { SortClause } from '../sort-clause';
import { IncludeBrowseCommandBuilder } from './include-browse-command-builder';
import { SortBrowseCommandBuilder } from './sort-browse-command-builder';

/**
 * Root browse command builder. This interface is used for browsing collections
 * starting from entity root.
 *
 * @type {RootBrowseCommandBuilder<TEntity>}
 */
export interface RootBrowseCommandBuilder<TEntity extends Entity>
{
    /**
     * Builds a command.
     * 
     * @returns {BrowseCommand<TEntity, unknown>} Browse command.
     */
    build(): BrowseCommand<TEntity, unknown>;

    /**
     * Filters browsed entity collection.
     * 
     * @param {FilterClause<TEntity>} filterClause Filter clause.
     * 
     * @returns {RootBrowseCommandBuilder<TEntity>} Root browse command builder.
     */
    filter(filterClause: FilterClause<TEntity>): RootBrowseCommandBuilder<TEntity>;

    /**
     * Sorts entity collection returned by the query in ascending order.
     * 
     * @param {SortClause<TEntity, TProperty>} sortClause Sort clause.
     * 
     * @returns {SortBrowseCommandBuilder<TEntity>} Sort browse command builder.
     */
    sortByAsc<TProperty>(sortClause: SortClause<TEntity, TProperty>): SortBrowseCommandBuilder<TEntity>;

    /**
     * Sorts entity collection returned by the query in descending order.
     * 
     * @param {SortClause<TEntity, TProperty>} sortClause Sort clause.
     * 
     * @returns {SortBrowseCommandBuilder<TEntity>} Sort browse command builder.
     */
    sortByDesc<TProperty>(sortClause: SortClause<TEntity, TProperty>): SortBrowseCommandBuilder<TEntity>;

    /**
     * Includes entity for eager loading.
     * 
     * @param {IncludeClause<TEntity, TProperty>} includeClause Include clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TProperty>} Include browse command builder.
     */
    include<TProperty extends Entity>(includeClause: IncludeClause<TEntity, TProperty>): IncludeBrowseCommandBuilder<TEntity, TProperty>;

    /**
     * Includes entity collection for eager loading.
     * 
     * @param {IncludeCollectionClause<TEntity, TProperty>} includeCollectionClause Include collection clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TProperty>} Include browse command builder.
     */
    includeCollection<TProperty extends Entity>(includeCollectionClause: IncludeCollectionClause<TEntity, TProperty>): IncludeBrowseCommandBuilder<TEntity, TProperty>;

    /**
     * Paginates browsed entity collection.
     * 
     * @param {PaginateClause<TEntity>} paginateClause Paginate clause.
     * 
     * @returns {RootBrowseCommandBuilder<TEntity>} Root browse command builder.
     */
    paginate(paginateClause: PaginateClause<TEntity>): RootBrowseCommandBuilder<TEntity>;

    /**
     * Finds entity by key values.
     * 
     * @param {ReadonlyArray<KeyValue>} keyValues Readonly array of key values.
     * 
     * @returns {Promise<Nullable<TEntity>>} Entity or null when entity not found.
     */
    find(...keyValues: ReadonlyArray<KeyValue>): Promise<Nullable<TEntity>>;

    /**
     * Finds entity by key values or throws an error.
     * 
     * @param {ReadonlyArray<KeyValue>} keyValues Readonly array of key values.
     * 
     * @returns {Promise<TEntity>} Entity or error.
     */
    findOrFail(...keyValues: ReadonlyArray<KeyValue>): Promise<TEntity>;

    /**
     * Finds all entities which match command expressions.
     * 
     * @returns {Promise<PaginatedEntityCollection<TEntity>>} Paginated entity collection.
     */
    findAll(): Promise<PaginatedEntityCollection<TEntity>>;

    /**
     * Finds one entity which matches command expressions.
     * 
     * @returns {Promise<Nullable<TEntity>>} Entity or null when nothing matches.
     */
    findOne(): Promise<Nullable<TEntity>>;

    /**
     * Finds one entity which matches command expressions or throws an error.
     * 
     * @returns {Promise<TEntity>} Entity or error.
     */
    findOneOrFail(): Promise<TEntity>;

    /**
     * Updates entities which matches command expressions.
     * 
     * @param {Partial<TEntity>} entityPartial Entity partial.
     * 
     * @returns {Promise<void>}
     */
    update(entityPartial: Partial<TEntity>): Promise<void>;

    /**
     * Removes entities which matches command expressions.
     * 
     * @returns {Promise<void>}
     */
    remove(): Promise<void>;
}
