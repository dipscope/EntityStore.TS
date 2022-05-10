/**
 * Represents request interceptor to json api. May be used to add additional behaviours
 * to a request.
 * 
 * @type {JsonApiRequestInterceptor}
 */
export type JsonApiRequestInterceptor = (request: Request) => Request;
