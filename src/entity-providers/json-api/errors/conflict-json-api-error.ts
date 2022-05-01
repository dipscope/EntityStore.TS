import { JsonApiError } from '../json-api-error';

/**
 * Conflict json api error.
 * 
 * @type {ConflictJsonApiError}
 */
export class ConflictJsonApiError extends JsonApiError
{
    /**
     * Constructor.
     * 
     * @param {string} href Target href.
     */
    public constructor(href: string)
    {
        super(`There was a conflict while processing a request to ${href}. Resource may have a wrong type or violation id or attribute.`, href, 409);
        
        Object.setPrototypeOf(this, new.target.prototype);

        return;
    }
}
