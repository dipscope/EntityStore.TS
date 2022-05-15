/**
 * Represents json api error.
 * 
 * @type {JsonApiError}
 */
export class JsonApiError extends Error
{
    /**
     * Target href.
     * 
     * @type {string}
     */
    public readonly href: string;

    /**
     * Http status represented as number.
     * 
     * @type {number}
     */
    public readonly status: number;

    /**
     * Constructor.
     * 
     * @param {string} message Message.
     * @param {string} href Href.
     * @param {number} status Status.
     */
    public constructor(message: string, href: string, status: number)
    {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        this.href = href;
        this.status = status;

        return;
    }
}
