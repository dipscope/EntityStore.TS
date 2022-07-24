import { Entity } from './entity';

/**
 * Represents a callback function over entity. It is expected to perform some action inside
 * such a function.
 * 
 * @type {EntityCallbackFn<TEntity>}
 */
export type EntityCallbackFn<TEntity extends Entity> = (entity: TEntity, index: number, entities: ReadonlyArray<TEntity>) => void;
