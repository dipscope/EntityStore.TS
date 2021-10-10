import { Entity } from './entity';

/**
 * Type to declare nullable entity.
 * 
 * @type {Nullable<TEntity>}
 */
export type Nullable<TEntity extends Entity> = TEntity | null;
