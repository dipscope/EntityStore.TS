import { JsonApiError } from '../json-api-error';

/**
 * Forbidden json api error.
 * 
 * @type {ForbiddenJsonApiError}
 */
export class ForbiddenJsonApiError extends JsonApiError
{
    /**
     * Constructor.
     * 
     * @param {string} href Target href.
     */
    public constructor(href: string)
    {
        super(`Unsupported request ${href} is sent to create a resource.`, href, 403);
        
        Object.setPrototypeOf(this, new.target.prototype);

        return;
    }
}
