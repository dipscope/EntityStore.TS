import { MetaObject } from './meta-object';

/**
 * An object that identifies an individual resource.
 * 
 * @type {ResourceIdentifierObject}
 */
export type ResourceIdentifierObject =
{
    /**
     * Resource id.
     * 
     * @type {string}
     */
    id: string;

    /**
     * Resource type.
     * 
     * @type {string}
     */
    type: string;

    /**
     * Meta.
     * 
     * @type {MetaObject}
     */
    meta?: MetaObject;
};
