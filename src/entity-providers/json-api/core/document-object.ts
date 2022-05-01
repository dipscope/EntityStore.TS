import { DataObject } from './data-object';
import { DocumentLinksObject } from './document-links-object';
import { ErrorObject } from './error-object';
import { JsonApiObject } from './json-api-object';
import { MetaObject } from './meta-object';
import { ResourceObject } from './resource-object';

/**
 * Document is a top level object of json api.
 * 
 * @type {DocumentObject}
 */
export type DocumentObject =
{
    /**
     * The document’s primary data.
     * 
     * @type {DataObject}
     */
    data?: DataObject,

    /**
     * Array of error objects.
     * 
     * @type {Array<ErrorObject>}
     */
    errors?: Array<ErrorObject>,

    /**
     * Meta object that contains non-standard meta-information.
     * 
     * @type {MetaObject}
     */
    meta?: MetaObject,

    /**
     * Object describing the server’s implementation.
     * 
     * @type {JsonApiObject}
     */
    jsonapi?: JsonApiObject;

    /**
     * Links object related to the primary data.
     * 
     * @type {DocumentLinksObject}
     */
    links?: DocumentLinksObject,

    /**
     * Array of resource objects that are related to the primary data and / or each other included resources.
     * 
     * @type {Array<ResourceObject>}
     */
    included?: Array<ResourceObject>
};
