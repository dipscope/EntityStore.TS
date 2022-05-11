import { JsonKey } from './json-key';
import { JsonValue } from './json-value';

/**
 * Represents json object.
 * 
 * @type {JsonObject}
 */
export type JsonObject = Record<JsonKey, JsonValue>;
