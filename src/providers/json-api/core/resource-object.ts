import { AttributesObject } from './attributes-object';
import { LinksObject } from './links-object';
import { MetaObject } from './meta-object';
import { RelationshipsObject } from './relationships-object';

/**
 * Represents json api resource object.
 * 
 * @type {ResourceObject}
 */
export type ResourceObject =
{
    /**
     * Resource id. May not be present when creating a resource.
     * 
     * @type {string}
     */
    id?: string;

    /**
     * Resource type.
     * 
     * @type {string}
     */
    type: string;

    /**
     * Attributes object representing some of the resource’s data.
     * 
     * @type {AttributesObject}
     */
    attributes?: AttributesObject;

    /**
     * Relationships object describing relationships between the resource and other resources.
     * 
     * @type {RelationshipsObject}
     */
    relationships?: RelationshipsObject

    /**
     * Links object containing links related to the resource.
     * 
     * @type {LinksObject}
     */
    links?: LinksObject;

    /**
     * Meta object containing non-standard meta-information about a resource that can not be 
     * represented as an attribute or relationship.
     * 
     * @type {MetaObject}
     */
    meta?: MetaObject;
};
