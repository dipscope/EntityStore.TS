import { JsonKey } from './json-key';
import { RelationshipObject } from './relationship-object';

/**
 * Members of the relationships object represent references from the resource object 
 * in which it’s defined to other resource objects.
 * 
 * @type {RelationshipsObject}
 */
export type RelationshipsObject = Record<JsonKey, RelationshipObject>;
