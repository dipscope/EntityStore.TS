import { EntityCollection } from '../../entity-collection';

/**
 * Represents in memory paginate predicate to paginate entities.
 * 
 * @type {InMemoryPaginatePredicate<TEntity>}
 */
export type InMemoryPaginatePredicate<TEntity> = (entityCollection: EntityCollection<TEntity>) => EntityCollection<TEntity>;
