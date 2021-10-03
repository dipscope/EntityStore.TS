import { EntityInfoProxy } from './entity-info-proxy';
import { PropertyInfoProxy } from './property-info-proxy';

export type OrderByClause<TEntity, TProperty> = (entityInfoProxy: EntityInfoProxy<TEntity>) => PropertyInfoProxy<TProperty>;
