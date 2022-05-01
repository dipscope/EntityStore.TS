import { LinkObject } from './link-object';
import { LinksObject } from './links-object';

/**
 * Error links object.
 * 
 * @type {ErrorLinksObject}
 */
export type ErrorLinksObject = LinksObject &
{
    /**
     * Link that leads to further details about this particular occurrence of the problem.
     * 
     * @type {LinkObject}
     */
    about: LinkObject;
};
