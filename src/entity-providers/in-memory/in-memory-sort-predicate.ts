/**
 * Represents in memory sort predicate to sort entities.
 * 
 * @type {InMemorySortPredicate<TEntity>}
 */
export type InMemorySortPredicate<TEntity> = (x: TEntity, y: TEntity) => number;
