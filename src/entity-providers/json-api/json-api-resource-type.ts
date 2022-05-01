import { JsonApiResource } from './json-api-resource';

/**
 * Json api resource type decorator.
 * 
 * @param {string} type Json api resource type.
 *
 * @returns {ClassDecorator} Class decorator.
 */
 export function JsonApiResourceType(type: string): ClassDecorator
 {
     return JsonApiResource({ type: type });
 }
 