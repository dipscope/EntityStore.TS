import { JsonObject } from './json-object';

/**
 * Json api object.
 * 
 * @type {JsonApiObject}
 */
export type JsonApiObject = JsonObject & 
{
    /**
     * Member whose value is a string indicating the highest JSON API version supported.
     * 
     * @type {string}
     */
    version: string;
};
