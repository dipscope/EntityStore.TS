import { JsonApiFilterExpressionVisitor } from './json-api-filter-expression-visitor';
import { JsonApiPaginateExpressionVisitor } from './json-api-paginate-expression-visitor';
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
     * Custom json api filter expression visitor to override default behaviour.
     * 
     * @type {JsonApiFilterExpressionVisitor}
     */
    jsonApiFilterExpressionVisitor?: JsonApiFilterExpressionVisitor;

    /**
     * Custom json api paginate expression visitor to override default behaviour.
     * 
     * @type {JsonApiPaginateExpressionVisitor}
     */
    jsonApiPaginateExpressionVisitor?: JsonApiPaginateExpressionVisitor;
}
