import { Fn } from '@dipscope/type-manager/core';

import { AndExpression } from '../../../expressions/and-expression';
import { ContainsExpression } from '../../../expressions/contains-expression';
import { EndsWithExpression } from '../../../expressions/ends-with-expression';
import { EqExpression } from '../../../expressions/eq-expression';
import { GtExpression } from '../../../expressions/gt-expression';
import { GteExpression } from '../../../expressions/gte-expression';
import { InExpression } from '../../../expressions/in-expression';
import { LtExpression } from '../../../expressions/lt-expression';
import { LteExpression } from '../../../expressions/lte-expression';
import { NotContainsExpression } from '../../../expressions/not-contains-expression';
import { NotEndsWithExpression } from '../../../expressions/not-ends-with-expression';
import { NotEqExpression } from '../../../expressions/not-eq-expression';
import { NotInExpression } from '../../../expressions/not-in-expression';
import { NotStartsWithExpression } from '../../../expressions/not-starts-with-expression';
import { OrExpression } from '../../../expressions/or-expression';
import { StartsWithExpression } from '../../../expressions/starts-with-expression';
import { PropertyInfo } from '../../../property-info';
import { JsonApiExpressionVisitor } from '../json-api-expression-visitor';

/**
 * Json api net expression visitor implementation.
 * 
 * @type {JsonApiNetExpressionVisitor}
 */
export class JsonApiNetExpressionVisitor extends JsonApiExpressionVisitor
{
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

    /**
     * Visits equal expression.
     * 
     * @param {EqExpression} eqExpression Equal expression.
     * 
     * @returns {string} Expression result.
     */
    public visitEqExpression(eqExpression: EqExpression): string
    {
        const propertyPath = this.extractPropertyPath(eqExpression.propertyInfo).join('.');
        const value = this.formatValue(eqExpression.propertyInfo, eqExpression.value);

        return `equals(${propertyPath}, ${value})`;
    }

    /**
     * Visits not equal expression.
     * 
     * @param {NotEqExpression} notEqExpression Not equal expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotEqExpression(notEqExpression: NotEqExpression): string
    {
        const propertyPath = this.extractPropertyPath(notEqExpression.propertyInfo).join('.');
        const value = this.formatValue(notEqExpression.propertyInfo, notEqExpression.value);

        return `not(equals(${propertyPath}, ${value}))`;
    }

    /**
     * Visits in expression.
     * 
     * @param {InExpression} inExpression In expression.
     * 
     * @returns {string} Expression result.
     */
    public visitInExpression(inExpression: InExpression): string
    {
        const propertyPath = this.extractPropertyPath(inExpression.propertyInfo).join('.');
        const value = inExpression.values.map(v => this.formatValue(inExpression.propertyInfo, v)).join(',');
        
        return `any(${propertyPath}, ${value}))`;
    }

    /**
     * Visits not in expression.
     * 
     * @param {NotInExpression} notInExpression Not in expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotInExpression(notInExpression: NotInExpression): string
    {
        const propertyPath = this.extractPropertyPath(notInExpression.propertyInfo).join('.');
        const value = notInExpression.values.map(v => this.formatValue(notInExpression.propertyInfo, v)).join(',');
        
        return `not(any(${propertyPath}, ${value})))`;
    }

    /**
     * Visits greater than expression.
     * 
     * @param {GtExpression} gtExpression Greater than expression.
     * 
     * @returns {string} Expression result.
     */
    public visitGtExpression(gtExpression: GtExpression): string
    {
        const propertyPath = this.extractPropertyPath(gtExpression.propertyInfo).join('.');
        const value = this.formatValue(gtExpression.propertyInfo, gtExpression.value);

        return `greaterThan(${propertyPath}, ${value})`;
    }

    /**
     * Visits greater than or equal expression.
     * 
     * @param {GteExpression} gteExpression Greater than or equal expression.
     * 
     * @returns {string} Expression result.
     */
    public visitGteExpression(gteExpression: GteExpression): string
    {
        const propertyPath = this.extractPropertyPath(gteExpression.propertyInfo).join('.');
        const value = this.formatValue(gteExpression.propertyInfo, gteExpression.value);

        return `greaterOrEqual(${propertyPath}, ${value})`;
    }

    /**
     * Visits lower than expression.
     * 
     * @param {LtExpression} ltExpression Lower than expression.
     * 
     * @returns {string} Expression result.
     */
    public visitLtExpression(ltExpression: LtExpression): string
    {
        const propertyPath = this.extractPropertyPath(ltExpression.propertyInfo).join('.');
        const value = this.formatValue(ltExpression.propertyInfo, ltExpression.value);

        return `lessThan(${propertyPath}, ${value})`;
    }

    /**
     * Visits lower than or equal expression.
     * 
     * @param {LteExpression} lteExpression Lower than or equal expression.
     * 
     * @returns {string} Expression result.
     */
    public visitLteExpression(lteExpression: LteExpression): string
    {
        const propertyPath = this.extractPropertyPath(lteExpression.propertyInfo).join('.');
        const value = this.formatValue(lteExpression.propertyInfo, lteExpression.value);

        return `lessOrEqual(${propertyPath}, ${value})`;
    }

    /**
     * Visits contains expression.
     * 
     * @param {ContainsExpression} containsExpression Contains expression.
     * 
     * @returns {string} Expression result.
     */
    public visitContainsExpression(containsExpression: ContainsExpression): string
    {
        const propertyPath = this.extractPropertyPath(containsExpression.propertyInfo).join('.');
        const value = this.formatValue(containsExpression.propertyInfo, containsExpression.value);

        return `contains(${propertyPath}, ${value})`;
    }

    /**
     * Visits not contains expression.
     * 
     * @param {NotContainsExpression} notContainsExpression Not contains expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotContainsExpression(notContainsExpression: NotContainsExpression): string
    {
        const propertyPath = this.extractPropertyPath(notContainsExpression.propertyInfo).join('.');
        const value = this.formatValue(notContainsExpression.propertyInfo, notContainsExpression.value);

        return `not(contains(${propertyPath}, ${value}))`;
    }

    /**
     * Visits starts with expression.
     * 
     * @param {StartsWithExpression} startsWithExpression Starts with expression.
     * 
     * @returns {string} Expression result.
     */
    public visitStartsWithExpression(startsWithExpression: StartsWithExpression): string
    {
        const propertyPath = this.extractPropertyPath(startsWithExpression.propertyInfo).join('.');
        const value = this.formatValue(startsWithExpression.propertyInfo, startsWithExpression.value);

        return `startsWith(${propertyPath}, ${value})`;
    }

    /**
     * Visits not starts with expression.
     * 
     * @param {NotStartsWithExpression} notStartsWithExpression Not starts with expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotStartsWithExpression(notStartsWithExpression: NotStartsWithExpression): string
    {
        const propertyPath = this.extractPropertyPath(notStartsWithExpression.propertyInfo).join('.');
        const value = this.formatValue(notStartsWithExpression.propertyInfo, notStartsWithExpression.value);

        return `not(startsWith(${propertyPath}, ${value}))`;
    }

    /**
     * Visits ends with expression.
     * 
     * @param {EndsWithExpression} endsWithExpression Ends with expression.
     * 
     * @returns {string} Expression result.
     */
    public visitEndsWithExpression(endsWithExpression: EndsWithExpression): string
    {
        const propertyPath = this.extractPropertyPath(endsWithExpression.propertyInfo).join('.');
        const value = this.formatValue(endsWithExpression.propertyInfo, endsWithExpression.value);

        return `endsWith(${propertyPath}, ${value})`;
    }

    /**
     * Visits not ends with expression.
     * 
     * @param {NotEndsWithExpression} notEndsWithExpression Not ends with expression.
     * 
     * @returns {string} Expression result.
     */
    public visitNotEndsWithExpression(notEndsWithExpression: NotEndsWithExpression): string
    {
        const propertyPath = this.extractPropertyPath(notEndsWithExpression.propertyInfo).join('.');
        const value = this.formatValue(notEndsWithExpression.propertyInfo, notEndsWithExpression.value);

        return `not(endsWith(${propertyPath}, ${value}))`;
    }

    /**
     * Visits and expression.
     * 
     * @param {AndExpression} andExpression And expression.
     * 
     * @returns {string} Expression result.
     */
    public visitAndExpression(andExpression: AndExpression): string
    {
        const filters = andExpression.filterExpressions.map(e => e.accept(this)).join(',');

        return `and(${filters})`;
    }

    /**
     * Visits or expression.
     * 
     * @param {OrExpression} orExpression Or expression.
     * 
     * @returns {string} Expression result.
     */
    public visitOrExpression(orExpression: OrExpression): string
    {
        const filters = orExpression.filterExpressions.map(e => e.accept(this)).join(',');

        return `or(${filters})`;
    }
}
