import { AndExpression } from './expressions/and-expression';
import { ContainsExpression } from './expressions/contains-expression';
import { EndsWithExpression } from './expressions/ends-with-expression';
import { EqExpression } from './expressions/eq-expression';
import { FilterExpression } from './expressions/filter-expression';
import { GtExpression } from './expressions/gt-expression';
import { GteExpression } from './expressions/gte-expression';
import { InExpression } from './expressions/in-expression';
import { LtExpression } from './expressions/lt-expression';
import { LteExpression } from './expressions/lte-expression';
import { NotContainsExpression } from './expressions/not-contains-expression';
import { NotEndsWithExpression } from './expressions/not-ends-with-expression';
import { NotEqExpression } from './expressions/not-eq-expression';
import { NotInExpression } from './expressions/not-in-expression';
import { NotStartsWithExpression } from './expressions/not-starts-with-expression';
import { OrExpression } from './expressions/or-expression';
import { StartsWithExpression } from './expressions/starts-with-expression';
import { PropertyInfoProxy } from './property-info-proxy';
import { proxyTargetSymbol } from './proxy-target-symbol';

/**
 * Builder used to build filter expressions.
 * 
 * @type {FilterExpressionBuilder}
 */
export class FilterExpressionBuilder
{
    /**
     * Builds equal expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {TProperty} value Expression value.
     * 
     * @returns {EqExpression} Equal expression.
     */
    public eq<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): EqExpression
    {
        return new EqExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds not equal expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {TProperty} value Expression value.
     * 
     * @returns {EqExpression} Not equal expression.
     */
    public notEq<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): NotEqExpression
    {
        return new NotEqExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds in expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {ReadonlyArray<TProperty>} values Expression values.
     * 
     * @returns {InExpression} In expression.
     */
    public in<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, values: ReadonlyArray<TProperty>): InExpression
    {
        return new InExpression(propertyInfoProxy[proxyTargetSymbol], values);
    }

    /**
     * Builds not in expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {ReadonlyArray<TProperty>} values Expression values.
     * 
     * @returns {NotInExpression} Not in expression.
     */
    public notIn<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, values: ReadonlyArray<TProperty>): NotInExpression
    {
        return new NotInExpression(propertyInfoProxy[proxyTargetSymbol], values);
    }

    /**
     * Builds greater than expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {TProperty} value Expression value.
     * 
     * @returns {GtExpression} Greater than expression.
     */
    public gt<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): GtExpression
    {
        return new GtExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }
 
    /**
     * Builds greater than or equal expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {TProperty} value Expression value.
     * 
     * @returns {GteExpression} Greater than or equal expression.
     */
    public gte<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): GteExpression
    {
        return new GteExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds lower than expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {TProperty} value Expression value.
     * 
     * @returns {LtExpression} Lower than expression.
     */
    public lt<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): LtExpression
    {
        return new LtExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds lower than or equal expression.
     * 
     * @param {PropertyInfoProxy<TProperty>} propertyInfoProxy Property info proxy.
     * @param {TProperty} value Expression value.
     * 
     * @returns {LteExpression} Lower than or equal expression.
     */
    public lte<TProperty>(propertyInfoProxy: PropertyInfoProxy<TProperty>, value: TProperty): LteExpression
    {
        return new LteExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds contains expression.
     * 
     * @param {PropertyInfoProxy<string>} propertyInfoProxy Property info proxy.
     * @param {string} value Expression value.
     * 
     * @returns {ContainsExpression} Contains expression.
     */
    public contains(propertyInfoProxy: PropertyInfoProxy<string>, value: string): ContainsExpression
    {
        return new ContainsExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds not contains expression.
     * 
     * @param {PropertyInfoProxy<string>} propertyInfoProxy Property info proxy.
     * @param {string} value Expression value.
     * 
     * @returns {NotContainsExpression} Contains expression.
     */
    public notContains(propertyInfoProxy: PropertyInfoProxy<string>, value: string): NotContainsExpression
    {
        return new NotContainsExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds starts with expression.
     * 
     * @param {PropertyInfoProxy<string>} propertyInfoProxy Property info proxy.
     * @param {string} value Expression value.
     * 
     * @returns {StartsWithExpression} Starts with expression.
     */
    public startsWith(propertyInfoProxy: PropertyInfoProxy<string>, value: string): StartsWithExpression
    {
        return new StartsWithExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds not starts with expression.
     * 
     * @param {PropertyInfoProxy<string>} propertyInfoProxy Property info proxy.
     * @param {string} value Expression value.
     * 
     * @returns {NotStartsWithExpression} Not starts with expression.
     */
    public notStartsWith(propertyInfoProxy: PropertyInfoProxy<string>, value: string): NotStartsWithExpression
    {
        return new NotStartsWithExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds ends with expression.
     * 
     * @param {PropertyInfoProxy<string>} propertyInfoProxy Property info proxy.
     * @param {string} value Expression value.
     * 
     * @returns {EndsWithExpression} Ends with expression.
     */
    public endsWith(propertyInfoProxy: PropertyInfoProxy<string>, value: string): EndsWithExpression
    {
        return new EndsWithExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds not ends with expression.
     * 
     * @param {PropertyInfoProxy<string>} propertyInfoProxy Property info proxy.
     * @param {string} value Expression value.
     * 
     * @returns {NotEndsWithExpression} Not ends with expression.
     */
    public notEndsWith(propertyInfoProxy: PropertyInfoProxy<string>, value: string): NotEndsWithExpression
    {
        return new NotEndsWithExpression(propertyInfoProxy[proxyTargetSymbol], value);
    }

    /**
     * Builds and expression.
     * 
     * @param {FilterExpression} firstFilterExpression First filter expression.
     * @param {FilterExpression} secondFilterExpression Second filter expression.
     * @param {ReadonlyArray<FilterExpression>} restFilterExpressions Rest filter expressions.
     * 
     * @returns {AndExpression} And expression.
     */
    public and(firstFilterExpression: FilterExpression, secondFilterExpression: FilterExpression, ...restFilterExpressions: ReadonlyArray<FilterExpression>): AndExpression
    {
        return new AndExpression(firstFilterExpression, secondFilterExpression, ...restFilterExpressions);
    }
    
    /**
     * Builds or expression.
     * 
     * @param {FilterExpression} firstFilterExpression First filter expression.
     * @param {FilterExpression} secondFilterExpression Second filter expression.
     * @param {ReadonlyArray<FilterExpression>} restFilterExpressions Rest filter expressions.
     * 
     * @returns {OrExpression} Or expression.
     */
    public or(firstFilterExpression: FilterExpression, secondFilterExpression: FilterExpression, ...restFilterExpressions: ReadonlyArray<FilterExpression>): OrExpression
    {
        return new OrExpression(firstFilterExpression, secondFilterExpression, ...restFilterExpressions);
    }
}
