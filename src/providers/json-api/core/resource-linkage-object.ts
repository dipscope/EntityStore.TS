import { ResourceIdentifierObject } from './resource-identifier-object';

/**
 * Resource linkage object in a compound document allows a client to link together all of the 
 * included resource objects without having to GET any URLs via links.
 * 
 * @type {ResourceLinkageObject}
 */
export type ResourceLinkageObject = null | ResourceIdentifierObject | Array<ResourceIdentifierObject>;
