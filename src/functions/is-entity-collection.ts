import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import { EntityCollection } from '../entity-collection';
import { entityCollectionSymbol } from '../entity-collection-symbol';

/**
 * Checks if value is entity collection in cross module way.
 *
 * @param {any} x Any value.
 *
 * @returns {bool} True when value is entity collection. False otherwise.
 */
export function isEntityCollection(x: any): x is EntityCollection<any>
{
    return isObject(x) && !isNil((x as any)[entityCollectionSymbol]);
}
