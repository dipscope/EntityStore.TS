import { Entity } from './entity';

/**
 * Represents a map function over entity. It is expected to return result value based on 
 * provided entity data.
 * 
 * @type {EntityMapFn<TEntity, TResult>}
 */
export type EntityMapFn<TEntity extends Entity, TResult> = (entity: TEntity, index: number, entities: ReadonlyArray<TEntity>) => TResult;
