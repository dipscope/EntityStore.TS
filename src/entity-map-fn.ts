/**
 * Represents a map function over entity. It is expected to return result value based on 
 * provided entity data.
 * 
 * @type {EntityMapFn<TEntity>}
 */
export type EntityMapFn<TEntity, TResult> = (entity: TEntity, index: number, entities: ReadonlyArray<TEntity>) => TResult;
