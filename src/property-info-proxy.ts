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
    [TChildProperty in keyof Required<TProperty>]: PropertyInfoProxyLevelOne<Required<TProperty>[TChildProperty]>;
};

/**
 * Level one of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelOne<TProperty>}
 */
export type PropertyInfoProxyLevelOne<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof Required<TProperty>]: PropertyInfoProxyLevelTwo<Required<TProperty>[TChildProperty]>;
};

/**
 * Level two of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelTwo<TProperty>}
 */
export type PropertyInfoProxyLevelTwo<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof Required<TProperty>]: PropertyInfoProxyLevelThree<Required<TProperty>[TChildProperty]>;
};

/**
 * Level three of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelThree<TProperty>}
 */
export type PropertyInfoProxyLevelThree<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof Required<TProperty>]: PropertyInfoProxyLevelFour<Required<TProperty>[TChildProperty]>;
};

/**
 * Level four of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelFour<TProperty>}
 */
export type PropertyInfoProxyLevelFour<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof Required<TProperty>]: PropertyInfoProxyLevelFive<Required<TProperty>[TChildProperty]>;
};

/**
 * Level five of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelFive<TProperty>}
 */
export type PropertyInfoProxyLevelFive<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof Required<TProperty>]: PropertyInfoProxyLevelSix<Required<TProperty>[TChildProperty]>;
};

/**
 * Level six of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelSix<TProperty>}
 */
export type PropertyInfoProxyLevelSix<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof Required<TProperty>]: PropertyInfoProxyLevelSeven<Required<TProperty>[TChildProperty]>;
};

/**
 * Level seven of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelSeven<TProperty>}
 */
export type PropertyInfoProxyLevelSeven<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof Required<TProperty>]: PropertyInfoProxyLevelEight<Required<TProperty>[TChildProperty]>;
};

/**
 * Level eight of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelEight<TProperty>}
 */
export type PropertyInfoProxyLevelEight<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof Required<TProperty>]: PropertyInfoProxyLevelNine<Required<TProperty>[TChildProperty]>;
};

/**
 * Level nine of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelNine<TProperty>}
 */
export type PropertyInfoProxyLevelNine<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof Required<TProperty>]: PropertyInfoProxyLevelTen<Required<TProperty>[TChildProperty]>;
};

/**
 * Level ten of property info proxy.
 * 
 * @type {PropertyInfoProxyLevelTen<TProperty>}
 */
export type PropertyInfoProxyLevelTen<TProperty> = PropertyInfoProxy<TProperty> & 
{
    [TChildProperty in keyof Required<TProperty>]: Required<TProperty>[TChildProperty];
};
