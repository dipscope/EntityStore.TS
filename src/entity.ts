import { PropertyName } from '@dipscope/type-manager';
import { Cursor } from './cursor';

/**
 * Type representing an entity.
 * 
 * @type {Entity}
 */
export type Entity = Record<PropertyName, any> & 
{
    /**
     * Optional cursor used for cursor based pagination.
     * 
     * @type {Cursor}
     */
    cursor?: Cursor
};
