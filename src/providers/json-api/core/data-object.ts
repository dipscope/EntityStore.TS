import { ResourceIdentifierObject } from './resource-identifier-object';
import { ResourceObject } from './resource-object';

/**
 * Data object is a part of document.
 * 
 * @type {DataObject}
 */
export type DataObject = null | ResourceObject | ResourceIdentifierObject | Array<ResourceObject> | Array<ResourceIdentifierObject>;
