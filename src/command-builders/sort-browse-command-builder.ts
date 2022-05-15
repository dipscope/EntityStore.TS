import { Entity } from '../entity';
import { SortClause } from '../sort-clause';
import { RootBrowseCommandBuilder } from './root-browse-command-builder';

/**
 * Sort browse command builder. This interface is used for deep sorting.
 * 
 * @type {SortBrowseCommandBuilder<TEntity>}
 */
export interface SortBrowseCommandBuilder<TEntity extends Entity> extends RootBrowseCommandBuilder<TEntity> 
{
    /**
     * Applies ascending child sort for an entity collection.
     * 
     * @param {SortClause<TEntity, TProperty>} sortClause Sort clause.
     * 
     * @returns {SortBrowseCommandBuilder<TEntity>} Sort browse command builder.
     */
    thenSortByAsc<TProperty>(sortClause: SortClause<TEntity, TProperty>): SortBrowseCommandBuilder<TEntity>;

    /**
     * Applies descending child sort for an entity collection.
     * 
     * @param {SortClause<TEntity, TProperty>} sortClause Sort clause.
     * 
     * @returns {SortBrowseCommandBuilder<TEntity>} Sort browse command builder.
     */
    thenSortByDesc<TProperty>(sortClause: SortClause<TEntity, TProperty>): SortBrowseCommandBuilder<TEntity>;
}
