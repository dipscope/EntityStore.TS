import { Entity } from './entity';
import { EntityCollection } from './entity-collection';

/**
 * Type to describe entity collection and similar types like 
 * array which can be used instead.
 * 
 * @type {EntityCollectionLike<TEntity>}
 */
export type EntityCollectionLike<TEntity extends Entity> = EntityCollection<TEntity> | Array<TEntity>;
