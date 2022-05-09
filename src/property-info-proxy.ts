import { PropertyInfo } from './property-info';
import { proxyTargetSymbol } from './proxy-target-symbol';

/**
 * Property info proxy to provide property traversal without actual accessing an object.
 * 
 * @type {PropertyInfoProxy<TProperty>}
 */
export type PropertyInfoProxy<TProperty> = 
{ 
    [proxyTargetSymbol]: PropertyInfo<TProperty>
};

/**
 * Root of property info proxy.
 * 
 * @type {PropertyInfoProxyRoot<TProperty>}
 */
export type PropertyInfoProxyRoot<TProperty> = PropertyInfoProxy<TProperty> & 
{ 
    [TChildProperty in keyof TProperty]: PropertyInfoProxyLevelOne<TProperty[TChildProperty]>;
};

/**
 * Level one of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelOne<TProperty>}
 */
export type PropertyInfoProxyLevelOne<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof TProperty]: PropertyInfoProxyLevelTwo<TProperty[TChildProperty]>;
};

/**
 * Level two of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelTwo<TProperty>}
 */
export type PropertyInfoProxyLevelTwo<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof TProperty]: PropertyInfoProxyLevelThree<TProperty[TChildProperty]>;
};

/**
 * Level three of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelThree<TProperty>}
 */
export type PropertyInfoProxyLevelThree<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof TProperty]: PropertyInfoProxyLevelFour<TProperty[TChildProperty]>;
};

/**
 * Level four of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelFour<TProperty>}
 */
export type PropertyInfoProxyLevelFour<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof TProperty]: PropertyInfoProxyLevelFive<TProperty[TChildProperty]>;
};

/**
 * Level five of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelFive<TProperty>}
 */
export type PropertyInfoProxyLevelFive<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof TProperty]: PropertyInfoProxyLevelSix<TProperty[TChildProperty]>;
};

/**
 * Level six of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelSix<TProperty>}
 */
export type PropertyInfoProxyLevelSix<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof TProperty]: PropertyInfoProxyLevelSeven<TProperty[TChildProperty]>;
};

/**
 * Level seven of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelSeven<TProperty>}
 */
export type PropertyInfoProxyLevelSeven<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof TProperty]: PropertyInfoProxyLevelEight<TProperty[TChildProperty]>;
};

/**
 * Level eight of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelEight<TProperty>}
 */
export type PropertyInfoProxyLevelEight<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof TProperty]: PropertyInfoProxyLevelNine<TProperty[TChildProperty]>;
};

/**
 * Level nine of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelNine<TProperty>}
 */
export type PropertyInfoProxyLevelNine<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof TProperty]: PropertyInfoProxyLevelTen<TProperty[TChildProperty]>;
};

/**
 * Level ten of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelTen<TProperty>}
 */
export type PropertyInfoProxyLevelTen<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof TProperty]: TProperty[TChildProperty];
};
