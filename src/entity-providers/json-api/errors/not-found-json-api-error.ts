import { JsonApiError } from '../json-api-error';

/**
 * Not found json api error.
 * 
 * @type {NotFoundJsonApiError}
 */
export class NotFoundJsonApiError extends JsonApiError
{
    /**
     * Constructor.
     * 
     * @param {string} href Target href.
     */
    public constructor(href: string)
    {
        super(`Target resource ${href} does not exists.`, href, 404);

        Object.setPrototypeOf(this, new.target.prototype);

        return;
    }
}
