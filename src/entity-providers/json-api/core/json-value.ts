import { JsonKey } from './json-key';

/**
 * Represents json value.
 * 
 * @type {JsonValue}
 */
export type JsonValue = null | string | number | boolean | Array<JsonValue> | 
{ 
    [jsonKey: JsonKey]: JsonValue
};
