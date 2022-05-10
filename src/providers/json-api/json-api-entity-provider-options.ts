import { JsonApiExpressionVisitor } from './json-api-expression-visitor';
import { JsonApiRequestInterceptor } from './json-api-request-interceptor';

/**
 * Options to configure json api entity provider.
 * 
 * @type {JsonApiEntityProviderOptions}
 */
export interface JsonApiEntityProviderOptions
{
    /**
     * Base url of json api.
     * 
     * @type {string}
     */
    baseUrl: string;

    /**
     * Json api request interceptor if any.
     * 
     * @type {JsonApiRequestInterceptor}
     */
    jsonApiRequestInterceptor?: JsonApiRequestInterceptor;

    /**
     * Custom json api expression visitor to override default behaviour.
     * 
     * @type {JsonApiExpressionVisitor}
     */
    jsonApiExpressionVisitor?: JsonApiExpressionVisitor;
}
