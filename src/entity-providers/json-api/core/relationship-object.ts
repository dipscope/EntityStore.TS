import { MetaObject } from './meta-object';
import { RelationshipLinksObject } from './relationship-links-object';
import { ResourceLinkageObject } from './resource-linkage-object';

/**
 * Represents a reference from the resource object in which it’s defined 
 * to other resource objects.
 * 
 * @type {RelationshipObject}
 */
export type RelationshipObject = 
{
    /**
     * Relationship links.
     * 
     * @type {RelationshipLinksObject}
     */
    links?: RelationshipLinksObject;
    
    /**
     * Resource linkage object.
     * 
     * @type {ResourceLinkageObject}
     */
    data?: ResourceLinkageObject;

    /**
     * Meta object that contains non-standard meta-information about the relationship.
     * 
     * @type {MetaObject}
     */
    meta?: MetaObject;
};
