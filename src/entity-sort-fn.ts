/**
 * Represents a sort function over entities. It is expected to return a negative value if the value of first 
 * entity is less than the value of second entity, zero if they are equal, and a positive value otherwise.
 * 
 * @type {EntitySortFn<TEntity>}
 */
export type EntitySortFn<TEntity> = (x: TEntity, y: TEntity) => number;
