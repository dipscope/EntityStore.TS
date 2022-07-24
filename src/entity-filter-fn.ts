import { Entity } from './entity';

/**
 * Represents a filter function over entity. It is expected to return a boolean value when
 * entity match the filter.
 * 
 * @type {EntityFilterFn<TEntity>}
 */
export type EntityFilterFn<TEntity extends Entity> = (entity: TEntity, index: number, entities: ReadonlyArray<TEntity>) => boolean;
