import { JsonApiResourceManager } from './json-api-resource-manager';
import { JsonApiResourceOptions } from './json-api-resource-options';

/**
 * Decorator to configure json api resource.
 * 
 * @param {TypeOptions<TType>} jsonApiResourceOptions Json api resource options.
 *
 * @returns {ClassDecorator} Class decorator.
 */
export function JsonApiResource(jsonApiResourceOptions: JsonApiResourceOptions): ClassDecorator
{
    return function (target: any): any
    {
        JsonApiResourceManager.defineJsonApiResourceMetadata(target, jsonApiResourceOptions);

        return target;
    };
}
