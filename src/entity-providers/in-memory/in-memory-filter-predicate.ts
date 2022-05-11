/**
 * Represents in memory filter predicate to filter entities.
 * 
 * @type {InMemoryFilterPredicate<TEntity>}
 */
export type InMemoryFilterPredicate<TEntity> = (entity: TEntity) => boolean;
