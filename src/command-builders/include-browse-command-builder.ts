import { Entity } from '../entity';
import { ThenIncludeClause, ThenIncludeCollectionClause } from '../include-clause';
import { RootBrowseCommandBuilder } from './root-browse-command-builder';

/**
 * Include browse command builder. This interface used for deep inclusion of objects.
 * 
 * @type {IncludeBrowseCommandBuilder<TEntity>}
 */
export interface IncludeBrowseCommandBuilder<TEntity extends Entity, TProperty extends Entity> extends RootBrowseCommandBuilder<TEntity>
{
    /**
     * Includes child entity for eager loading.
     * 
     * @param {ThenIncludeClause<TProperty, TChildProperty>} thenIncludeClause Then include clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TChildProperty>} Include browse command builder.
     */
    thenInclude<TChildProperty extends Entity>(thenIncludeClause: ThenIncludeClause<TProperty, TChildProperty>): IncludeBrowseCommandBuilder<TEntity, TChildProperty>;

    /**
     * Includes child entity collection for eager loading.
     * 
     * @param {ThenIncludeCollectionClause<TProperty, TChildProperty>} thenIncludeCollectionClause Then include collection clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TChildProperty>} Include browse command builder.
     */
    thenIncludeCollection<TChildProperty extends Entity>(thenIncludeCollectionClause: ThenIncludeCollectionClause<TProperty, TChildProperty>): IncludeBrowseCommandBuilder<TEntity, TChildProperty>;
}
