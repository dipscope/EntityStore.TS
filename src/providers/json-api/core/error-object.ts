import { ErrorLinksObject } from './error-links-object';
import { ErrorSourceObject } from './error-source-object';
import { MetaObject } from './meta-object';

/**
 * Main error object.
 * 
 * @type {ErrorObject}
 */
export type ErrorObject = 
{
    /**
     * Unique identifier for this particular occurrence of the problem.
     * 
     * @type {string}
     */
    id?: string,

    /**
     * Error links.
     * 
     * @type {ErrorLinksObject}
     */
    links?: ErrorLinksObject;

    /**
     * The HTTP status code applicable to this problem, expressed as a string value.
     * 
     * @type {string}
     */
    status?: string;

    /**
     * An application-specific error code, expressed as a string value.
     * 
     * @type {string}
     */
    code?: string;

    /**
     * Short, human-readable summary of the problem.
     * 
     * @type {string}
     */
    title?: string;

    /**
     * Human-readable explanation specific to this occurrence of the problem.
     * 
     * @type {string}
     */
    detail?: string;

    /**
     * Object containing references to the source of the error.
     * 
     * @type {ErrorSourceObject}
     */
    source?: ErrorSourceObject;

    /**
     * Meta object containing non-standard meta-information about the error.
     * 
     * @type {MetaObject}
     */
    meta?: MetaObject;
};
