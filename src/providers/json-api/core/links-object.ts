import { JsonKey } from './json-key';
import { LinkObject } from './link-object';

/**
 * Members of the links object represent references to related sources.
 * 
 * @type {LinksObject}
 */
export type LinksObject = Record<JsonKey, LinkObject>;
