import { JsonObject } from './json-object';

/**
 * Error source object.
 * 
 * @type {ErrorSourceObject}
 */
export type ErrorSourceObject = JsonObject &
{
    /**
     * Json pointer to the associated entity in the request document. 
     * E.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute.
     * 
     * @type {string}
     */
    pointer?: string;

    /**
     * String indicating which URI query parameter caused the error.
     * 
     * @type {string}
     */
    parameter?: string;
};
