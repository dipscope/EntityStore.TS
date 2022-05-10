import { Fn } from '@dipscope/type-manager/core';

import { DocumentObject } from './core/document-object';
import { LinkObject } from './core/link-object';
import { ConflictJsonApiError } from './errors/conflict-json-api-error';
import { ForbiddenJsonApiError } from './errors/forbidden-json-api-error';
import { NotFoundJsonApiError } from './errors/not-found-json-api-error';
import { OtherJsonApiError } from './errors/other-json-api-error';
import { JsonApiRequestInterceptor } from './json-api-request-interceptor';

/**
 * Represents a connection to json api.
 * 
 * @type {JsonApiConnection}
 */
export class JsonApiConnection 
{
    /**
     * Base url provided by developer.
     * 
     * @type {string}
     */
    public readonly baseUrl: string;

    /**
     * Json api request interceptor for adding additional behaviours.
     * 
     * @type {JsonApiRequestInterceptor}
     */
    public readonly jsonApiRequestInterceptor: JsonApiRequestInterceptor;

    /**
     * Headers sent with each request.
     * 
     * @type {Headers}
     */
    public readonly headers: Headers;

    /**
     * Constructor.
     * 
     * @param {string} baseUrl Base url provided by developer. 
     * @param {JsonApiRequestInterceptor} jsonApiRequestInterceptor Json api request interceptor for adding additional behaviours.
     */
    public constructor(baseUrl: string, jsonApiRequestInterceptor: JsonApiRequestInterceptor) 
    {
        this.baseUrl = baseUrl.replace(new RegExp('\\/+$', 'g'), '');
        this.jsonApiRequestInterceptor = jsonApiRequestInterceptor;
        this.headers = this.buildHeaders();

        return;
    }

    /**
     * Builds base headers used for requests.
     * 
     * @returns {Headers} Headers used for requests.
     */
    private buildHeaders(): Headers
    {
        const headers = new Headers();

        headers.set('Content-Type', 'application/vnd.api+json');
        headers.set('Accept', 'application/vnd.api+json');

        return headers;
    }

    /**
     * Sends a get request using provided link object.
     * 
     * @param {LinkObject} linkObject Link object.
     * 
     * @returns {DocumentObject} Document object.
     */
    public async get(linkObject: LinkObject): Promise<DocumentObject>
    {
        const href = this.extractHref(linkObject);
        const headers = new Headers(this.headers);
        const request = new Request(href, { headers: headers, credentials: 'same-origin', method: 'GET' });
        const interceptedRequest = this.jsonApiRequestInterceptor(request);
        const response = await fetch(interceptedRequest);

        switch (response.status)
        {
            case 200:
                return await response.json();
            case 404:
                throw new NotFoundJsonApiError(href);
            default:
                throw new OtherJsonApiError(href, response.status);
        }
    }

    /**
     * Sends a post request using provided link and document object.
     * 
     * @param {LinkObject} linkObject Link object.
     * @param {DocumentObject} documentObject Document object.
     * 
     * @returns {DocumentObject} Document object.
     */
    public async post(linkObject: LinkObject, documentObject: DocumentObject): Promise<DocumentObject> 
    {
        const href = this.extractHref(linkObject);
        const body = JSON.stringify(documentObject);
        const headers = new Headers(this.headers);
        const request = new Request(href, { headers: headers, credentials: 'same-origin', method: 'POST', body: body });
        const interceptedRequest = this.jsonApiRequestInterceptor(request);
        const response = await fetch(interceptedRequest);

        switch (response.status)
        {
            case 201:
                return await response.json();
            case 202:
            case 204:
                return documentObject;
            case 403:
                throw new ForbiddenJsonApiError(href);
            case 404:
                throw new NotFoundJsonApiError(href);
            case 409:
                throw new ConflictJsonApiError(href);
            default:
                throw new OtherJsonApiError(href, response.status);
        }
    }

    /**
     * Sends a patch request using provided link and document object.
     * 
     * @param {LinkObject} linkObject Link object.
     * @param {DocumentObject} documentObject Document object.
     * 
     * @returns {DocumentObject} Document object.
     */
    public async patch(linkObject: LinkObject, documentObject: DocumentObject): Promise<DocumentObject>
    {
        const href = this.extractHref(linkObject);
        const body = JSON.stringify(documentObject);
        const headers = new Headers(this.headers);
        const request = new Request(href, { headers: headers, credentials: 'same-origin', method: 'PATCH', body: body });
        const interceptedRequest = this.jsonApiRequestInterceptor(request);
        const response = await fetch(interceptedRequest);

        switch (response.status)
        {
            case 200:
                return await response.json();
            case 202:
            case 204:
                return documentObject;
            case 403:
                throw new ForbiddenJsonApiError(href);
            case 404:
                throw new NotFoundJsonApiError(href);
            case 409:
                throw new ConflictJsonApiError(href);
            default:
                throw new OtherJsonApiError(href, response.status);
        }
    }

    /**
     * Sends a delete request using provided link object.
     * 
     * @param {LinkObject} linkObject Link object.
     * 
     * @returns {DocumentObject} Document object.
     */
    public async delete(linkObject: LinkObject): Promise<void>
    {
        const href = this.extractHref(linkObject);
        const headers = new Headers(this.headers);
        const request = new Request(href, { headers: headers, credentials: 'same-origin', method: 'DELETE' });
        const interceptedRequest = this.jsonApiRequestInterceptor(request);
        const response = await fetch(interceptedRequest);

        switch (response.status)
        {
            case 200:
            case 202:
            case 204:
                return;
            case 404:
                throw new NotFoundJsonApiError(href);
            default:
                throw new OtherJsonApiError(href, response.status);
        }
    }

    /**
     * Extracts href from link object.
     * 
     * @param {LinkObject} linkObject Link object.
     * 
     * @returns {string} Link href.
     */
    private extractHref(linkObject: LinkObject): string
    {
        return Fn.isString(linkObject) ? linkObject : linkObject.href;
    }
}
