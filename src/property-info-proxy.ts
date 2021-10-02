/**
 * Property info proxy to provide property traversal without actual accessing an object.
 * 
 * @type {PropertyInfoProxy<TProperty>}
 */
export type PropertyInfoProxy<TProperty> = {
    [TChildProperty in keyof TProperty]: PropertyInfoProxy<TProperty[TChildProperty]>;
};
