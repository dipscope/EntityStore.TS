import { MetaObject } from './meta-object';

/**
 * Link object represents a link.
 * 
 * @type {LinkObject}
 */
export type LinkObject = string |
{
    /**
     * String containing the link’s URL.
     * 
     * @type {string}
     */
    href: string,

    /**
     * Meta object containing non-standard meta-information about the link.
     * 
     * @type {MetaObject}
     */
    meta: MetaObject;
};
