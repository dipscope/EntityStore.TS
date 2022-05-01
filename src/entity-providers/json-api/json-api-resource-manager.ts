import { JsonApiResourceOptions } from './json-api-resource-options';

/**
 * Json api resource decorator.
 * 
 * @param {TypeOptions<TType>} jsonApiResourceOptions Json api resource options.
 *
 * @returns {ClassDecorator} Class decorator.
 */
 export function JsonApiResource(jsonApiResourceOptions: JsonApiResourceOptions): ClassDecorator
 {
     return function (target: any): any
     {
         TypeManager.defineTypeMetadata(target, typeOptions).reflectInjectMetadata();
 
         return target;
     };
 }