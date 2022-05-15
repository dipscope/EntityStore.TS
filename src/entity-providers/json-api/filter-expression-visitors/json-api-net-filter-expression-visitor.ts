import { Fn } from '@dipscope/type-manager/core';

import { AndFilterExpression } from '../../../filter-expressions/and-filter-expression';
import { ContainsFilterExpression } from '../../../filter-expressions/contains-filter-expression';
import { EndsWithFilterExpression } from '../../../filter-expressions/ends-with-filter-expression';
import { EqFilterExpression } from '../../../filter-expressions/eq-filter-expression';
import { GtFilterExpression } from '../../../filter-expressions/gt-filter-expression';
import { GteFilterExpression } from '../../../filter-expressions/gte-filter-expression';
import { InFilterExpression } from '../../../filter-expressions/in-filter-expression';
import { LtFilterExpression } from '../../../filter-expressions/lt-filter-expression';
import { LteFilterExpression } from '../../../filter-expressions/lte-filter-expression';
import { NotContainsFilterExpression } from '../../../filter-expressions/not-contains-filter-expression';
import { NotEndsWithFilterExpression } from '../../../filter-expressions/not-ends-with-filter-expression';
import { NotEqFilterExpression } from '../../../filter-expressions/not-eq-filter-expression';
import { NotInFilterExpression } from '../../../filter-expressions/not-in-filter-expression';
import { NotStartsWithFilterExpression } from '../../../filter-expressions/not-starts-with-filter-expression';
import { OrFilterExpression } from '../../../filter-expressions/or-filter-expression';
import { StartsWithFilterExpression } from '../../../filter-expressions/starts-with-filter-expression';
import { PropertyInfo } from '../../../property-info';
import { JsonApiFilterExpressionVisitor } from '../json-api-filter-expression-visitor';

/**
 * Json api net filter expression visitor implementation.
 * 
 * @type {JsonApiNetFilterExpressionVisitor}
 */
export class JsonApiNetFilterExpressionVisitor extends JsonApiFilterExpressionVisitor
{
    /**
     * Constructor.
     */
    public constructor()
    {
        super('filter=');

        return;
    }
    
    /**
     * Visits equal filter expression.
     * 
     * @param {EqFilterExpression} eqFilterExpression Equal filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitEqFilterExpression(eqFilterExpression: EqFilterExpression): string
    {
        const propertyPath = eqFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = this.formatValue(eqFilterExpression.propertyInfo, eqFilterExpression.value);

        return `equals(${propertyPath}, ${value})`;
    }

    /**
     * Visits not equal filter expression.
     * 
     * @param {NotEqFilterExpression} notEqFilterExpression Not equal filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotEqFilterExpression(notEqFilterExpression: NotEqFilterExpression): string
    {
        const propertyPath = notEqFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = this.formatValue(notEqFilterExpression.propertyInfo, notEqFilterExpression.value);

        return `not(equals(${propertyPath}, ${value}))`;
    }
    
    /**
     * Visits in filter expression.
     * 
     * @param {InFilterExpression} inFilterExpression In filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitInFilterExpression(inFilterExpression: InFilterExpression): string
    {
        const propertyPath = inFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = inFilterExpression.values.map(v => this.formatValue(inFilterExpression.propertyInfo, v)).join(',');
        
        return `any(${propertyPath}, ${value}))`;
    }

    /**
     * Visits not in filter expression.
     * 
     * @param {NotInFilterExpression} notInFilterExpression Not in filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotInFilterExpression(notInFilterExpression: NotInFilterExpression): string
    {
        const propertyPath = notInFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = notInFilterExpression.values.map(v => this.formatValue(notInFilterExpression.propertyInfo, v)).join(',');
        
        return `not(any(${propertyPath}, ${value})))`;
    }

    /**
     * Visits greater than filter expression.
     * 
     * @param {GtFilterExpression} gtFilterExpression Greater than filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitGtFilterExpression(gtFilterExpression: GtFilterExpression): string
    {
        const propertyPath = gtFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = this.formatValue(gtFilterExpression.propertyInfo, gtFilterExpression.value);

        return `greaterThan(${propertyPath}, ${value})`;
    }

    /**
     * Visits greater than or equal filter expression.
     * 
     * @param {GteFilterExpression} gteFilterExpression Greater than or equal filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitGteFilterExpression(gteFilterExpression: GteFilterExpression): string
    {
        const propertyPath = gteFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = this.formatValue(gteFilterExpression.propertyInfo, gteFilterExpression.value);

        return `greaterOrEqual(${propertyPath}, ${value})`;
    }

    /**
     * Visits lower than filter expression.
     * 
     * @param {LtFilterExpression} ltFilterExpression Lower than filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitLtFilterExpression(ltFilterExpression: LtFilterExpression): string
    {
        const propertyPath = ltFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = this.formatValue(ltFilterExpression.propertyInfo, ltFilterExpression.value);

        return `lessThan(${propertyPath}, ${value})`;
    }

    /**
     * Visits lower than or equal filter expression.
     * 
     * @param {LteFilterExpression} lteFilterExpression Lower than or equal filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitLteFilterExpression(lteFilterExpression: LteFilterExpression): string
    {
        const propertyPath = lteFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = this.formatValue(lteFilterExpression.propertyInfo, lteFilterExpression.value);

        return `lessOrEqual(${propertyPath}, ${value})`;
    }

    /**
     * Visits contains filter expression.
     * 
     * @param {ContainsFilterExpression} containsFilterExpression Contains filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitContainsFilterExpression(containsFilterExpression: ContainsFilterExpression): string
    {
        const propertyPath = containsFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = this.formatValue(containsFilterExpression.propertyInfo, containsFilterExpression.value);

        return `contains(${propertyPath}, ${value})`;
    }

    /**
     * Visits not contains filter expression.
     * 
     * @param {NotContainsFilterExpression} notContainsFilterExpression Not contains filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotContainsFilterExpression(notContainsFilterExpression: NotContainsFilterExpression): string
    {
        const propertyPath = notContainsFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = this.formatValue(notContainsFilterExpression.propertyInfo, notContainsFilterExpression.value);

        return `not(contains(${propertyPath}, ${value}))`;
    }

    /**
     * Visits starts with filter expression.
     * 
     * @param {StartsWithFilterExpression} startsWithFilterExpression Starts with filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitStartsWithFilterExpression(startsWithFilterExpression: StartsWithFilterExpression): string
    {
        const propertyPath = startsWithFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = this.formatValue(startsWithFilterExpression.propertyInfo, startsWithFilterExpression.value);

        return `startsWith(${propertyPath}, ${value})`;
    }

    /**
     * Visits not starts with filter expression.
     * 
     * @param {NotStartsWithFilterExpression} notStartsWithFilterExpression Not starts with filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotStartsWithFilterExpression(notStartsWithFilterExpression: NotStartsWithFilterExpression): string
    {
        const propertyPath = notStartsWithFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = this.formatValue(notStartsWithFilterExpression.propertyInfo, notStartsWithFilterExpression.value);

        return `not(startsWith(${propertyPath}, ${value}))`;
    }

    /**
     * Visits ends with filter expression.
     * 
     * @param {EndsWithFilterExpression} endsWithFilterExpression Ends with filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitEndsWithFilterExpression(endsWithFilterExpression: EndsWithFilterExpression): string
    {
        const propertyPath = endsWithFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = this.formatValue(endsWithFilterExpression.propertyInfo, endsWithFilterExpression.value);

        return `endsWith(${propertyPath}, ${value})`;
    }

    /**
     * Visits not ends with filter expression.
     * 
     * @param {NotEndsWithFilterExpression} notEndsWithFilterExpression Not ends with filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotEndsWithFilterExpression(notEndsWithFilterExpression: NotEndsWithFilterExpression): string
    {
        const propertyPath = notEndsWithFilterExpression.propertyInfo.extractSerializedPropertyPath().join('.');
        const value = this.formatValue(notEndsWithFilterExpression.propertyInfo, notEndsWithFilterExpression.value);

        return `not(endsWith(${propertyPath}, ${value}))`;
    }

    /**
     * Visits and filter expression.
     * 
     * @param {AndFilterExpression} andFilterExpression And filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitAndFilterExpression(andFilterExpression: AndFilterExpression): string
    {
        const filters = andFilterExpression.filterExpressions.map(e => e.accept(this)).join(',');

        return `and(${filters})`;
    }

    /**
     * Visits or filter expression.
     * 
     * @param {OrFilterExpression} orFilterExpression Or filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitOrFilterExpression(orFilterExpression: OrFilterExpression): string
    {
        const filters = orFilterExpression.filterExpressions.map(e => e.accept(this)).join(',');

        return `or(${filters})`;
    }
    
    /**
     * Formats value for filtering.
     * 
     * @param {any} value Value to format.
     * 
     * @returns {string} Formatted value.
     */
    protected formatValue(propertyInfo: PropertyInfo<any>, value: any): string
    {
        const serializedValue = this.serializeValue(propertyInfo, value);

        if (Fn.isNil(serializedValue))
        {
            return 'null';
        }

        return `'${serializedValue}'`;
    }
}
