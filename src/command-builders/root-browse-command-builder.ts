import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { FilterClause } from '../filter-clause';
import { IncludeClause, IncludeCollectionClause } from '../include-clause';
import { Nullable } from '../nullable';
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
     * Filters browsed entity collection.
     * 
     * @param {FilterClause<TEntity>} filterClause Filter clause.
     * 
     * @returns {RootBrowseCommandBuilder<TEntity>} Root browse command builder.
     */
    where(filterClause: FilterClause<TEntity>): RootBrowseCommandBuilder<TEntity>;

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
    include<TProperty>(includeClause: IncludeClause<TEntity, TProperty>): IncludeBrowseCommandBuilder<TEntity, TProperty>;

    /**
     * Includes entity collection for eager loading.
     * 
     * @param {IncludeCollectionClause<TEntity, TProperty>} includeCollectionClause Include collection clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TProperty>} Include browse command builder.
     */
    includeCollection<TProperty>(includeCollectionClause: IncludeCollectionClause<TEntity, TProperty>): IncludeBrowseCommandBuilder<TEntity, TProperty>;

    /**
     * Skips a certain amount of entities.
     * 
     * @param {number} count Number of entities to skip.
     * 
     * @returns {RootBrowseCommandBuilder<TEntity>} Root browse command builder.
     */
    skip(count: number): RootBrowseCommandBuilder<TEntity>;

    /**
     * Takes a certain amount of entities.
     * 
     * @param {number} count Number of entities to take.
     * 
     * @returns {RootBrowseCommandBuilder<TEntity>} Root browse command builder.
     */
    take(count: number): RootBrowseCommandBuilder<TEntity>;

    /**
     * Finds all entities which match command expressions.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Entity collection.
     */
    findAll(): Promise<EntityCollection<TEntity>>;

    /**
     * Finds one entity which matches command expressions.
     * 
     * @returns {Promise<Nullable<TEntity>>} Entity or null when nothing matches.
     */
    findOne(): Promise<Nullable<TEntity>>;
    
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
