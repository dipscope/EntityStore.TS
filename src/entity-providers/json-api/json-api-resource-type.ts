import { JsonApiResource } from './json-api-resource';

/**
 * Decorator to configure json api resource type.
 * 
 * @param {string} type Json api resource type.
 *
 * @returns {ClassDecorator} Class decorator.
 */
export function JsonApiResourceType(type: string): ClassDecorator
{
    return JsonApiResource({ type: type });
}
 