import { JsonApiError } from '../json-api-error';

/**
 * Other json api error.
 * 
 * @type {OtherJsonApiError}
 */
export class OtherJsonApiError extends JsonApiError
{
    /**
     * Constructor.
     * 
     * @param {string} href Target href.
     * @param {number} status Status.
     */
    public constructor(href: string, status: number)
    {
        super(`Error occured while accesing the resource ${href}.`, href, status);

        Object.setPrototypeOf(this, new.target.prototype);

        return;
    }
}
