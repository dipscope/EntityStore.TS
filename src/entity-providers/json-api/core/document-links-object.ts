import { LinkObject } from './link-object';
import { LinksObject } from './links-object';

/**
 * Represents document links.
 * 
 * @type {DocumentLinksObject}
 */
export type DocumentLinksObject = LinksObject &
{
    /**
     * The first page of data.
     * 
     * @type {LinkObject}
     */
    first?: LinkObject,

    /**
     * The last page of data.
     * 
     * @type {LinkObject}
     */
    last?: LinkObject,

    /**
     * The previous page of data.
     * 
     * @type {LinkObject}
     */
    prev?: LinkObject,

    /**
     * The next page of data.
     * 
     * @type {LinkObject}
     */
    next?: LinkObject
};
