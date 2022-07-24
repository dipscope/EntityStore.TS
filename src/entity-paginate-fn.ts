import { Entity } from './entity';
import { PaginatedEntityCollection } from './paginated-entity-collection';

/**
 * Represents a paginate function over entity. It is expected to return a paginated entity collection
 * based on provided entities and custom paginate logic.
 * 
 * @type {EntityPaginateFn<TEntity>}
 */
export type EntityPaginateFn<TEntity extends Entity> = (entities: ReadonlyArray<TEntity>) => PaginatedEntityCollection<TEntity>;
