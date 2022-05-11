import { Fn, ReferenceCallback, ReferenceKey } from '@dipscope/type-manager/core';
import { ReferenceValue, SerializerContext } from '@dipscope/type-manager/core';

import { ExpressionVisitor } from '../../expression-visitor';
import { AndExpression } from '../../filter-expressions/and-filter-expression';
import { ContainsExpression } from '../../filter-expressions/contains-filter-expression';
import { EndsWithExpression } from '../../filter-expressions/ends-with-filter-expression';
import { EqExpression } from '../../filter-expressions/eq-filter-expression';
import { GtExpression } from '../../filter-expressions/gt-filter-expression';
import { GteExpression } from '../../filter-expressions/gte-filter-expression';
import { InExpression } from '../../filter-expressions/in-filter-expression';
import { IncludeExpression } from '../../filter-expressions/include-expression';
import { LtExpression } from '../../filter-expressions/lt-filter-expression';
import { LteExpression } from '../../filter-expressions/lte-filter-expression';
import { NotContainsExpression } from '../../filter-expressions/not-contains-filter-expression';
import { NotEndsWithExpression } from '../../filter-expressions/not-ends-with-filter-expression';
import { NotEqExpression } from '../../filter-expressions/not-eq-filter-expression';
import { NotInExpression } from '../../filter-expressions/not-in-filter-expression';
import {
    NotStartsWithExpression
} from '../../filter-expressions/not-starts-with-filter-expression';
import { OrExpression } from '../../filter-expressions/or-filter-expression';
import { OrderExpression } from '../../filter-expressions/order-expression';
import { StartsWithExpression } from '../../filter-expressions/starts-with-filter-expression';
import { PropertyInfo } from '../../property-info';
import { SortDirection } from '../../sort-direction';

/**
 * Json api expression visitor which traverses expression tree and returns a result.
 * 
 * @type {JsonApiExpressionVisitor}
 */
export abstract class JsonApiExpressionVisitor implements ExpressionVisitor<string>
{
    /**
     * Defines filter prefix which prepended right before returned result.
     * 
     * @type {string} Filter prefix to prepend.
     */
    public defineFilterPrefix(): string
    {
        return 'filter=';
    }

    /**
     * Defines order prefix which prepended right before returned result.
     * 
     * @type {string} Order prefix to prepend.
     */
    public defineOrderPrefix(): string
    {
        return 'sort=';
    }

    /**
     * Defines include prefix which prepended right before returned result.
     * 
     * @type {string} Include prefix to prepend.
     */
    public defineIncludePrefix(): string
    {
        return 'include=';
    }
    
    /**
     * Extracts property path from property info.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info.
     * 
     * @returns {Array<string>} Property path used for filtering and sorting.
     */
    protected extractPropertyPath(propertyInfo: PropertyInfo<any>): Array<string>
    {
        const propertyPath = new Array<string>(propertyInfo.propertyMetadata.serializedPropertyName);

        if (Fn.isNil(propertyInfo.parentPropertyInfo))
        {
            return propertyPath;
        }

        const parentPropertyPath = this.extractPropertyPath(propertyInfo.parentPropertyInfo);

        return new Array<string>(...parentPropertyPath, ...propertyPath);
    }

    /**
     * Serializes value based on property info.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info.
     * @param {any} value Value.
     * 
     * @returns {any} Serialized value.
     */
    protected serializeValue(propertyInfo: PropertyInfo<any>, value: any): any
    {
        const serializerContext = this.createSerializerContext(propertyInfo, value);

        return serializerContext.serialize(value);
    }

    /**
     * Creates serializer context for a property.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info.
     * @param {any} x Root object.
     * 
     * @returns {SerializerContext<any>} Property serializer context.
     */
    private createSerializerContext(propertyInfo: PropertyInfo<any>, x: any): SerializerContext<any>
    {
        const serializerContext = new SerializerContext({
            $: x,
            path: '$',
            typeMetadata: propertyInfo.propertyMetadata.typeMetadata,
            referenceCallbackMap: new WeakMap<ReferenceKey, Array<ReferenceCallback>>(),
            referenceMap: new WeakMap<ReferenceKey, ReferenceValue>()
        });

        return serializerContext;
    }

    /**
     * Visits include expression.
     * 
     * @param {IncludeExpression} includeExpression Include expression.
     * 
     * @returns {string} Expression result.
     */
    public visitIncludeExpression(includeExpression: IncludeExpression): string
    {
        const propertyPath = this.extractPropertyPath(includeExpression.propertyInfo).join('.');

        if (Fn.isNil(includeExpression.parentIncludeExpression))
        {
            return propertyPath;
        }

        const parentInclude = this.visitIncludeExpression(includeExpression.parentIncludeExpression);
        const separator = Fn.isNil(includeExpression.entityInfo) ? '.' : ',';

        return `${parentInclude}${separator}${propertyPath}`;
    }

    /**
     * Visits order expression.
     * 
     * @param {OrderExpression} orderExpression Order expression.
     * 
     * @returns {string} Expression result.
     */
    public visitOrderExpression(orderExpression: OrderExpression): string
    {
        const propertyPath = this.extractPropertyPath(orderExpression.propertyInfo).join('.');
        const orderDirection = orderExpression.orderDirection === SortDirection.Asc ? '' : '-';
        const order = `${orderDirection}${propertyPath}`;

        if (Fn.isNil(orderExpression.parentOrderExpression))
        {
            return order;
        }

        const parentOrder = this.visitOrderExpression(orderExpression.parentOrderExpression);

        return `${parentOrder},${order}`;
    }
    
    /**
     * Formats value for filtering.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info.
     * @param {any} value Value to format.
     * 
     * @returns {string} Formatted value.
     */
    protected abstract formatValue(propertyInfo: PropertyInfo<any>, value: any): string;

    /**
     * Visits equal expression.
     * 
     * @param {EqExpression} eqExpression Equal expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitEqExpression(eqExpression: EqExpression): string;

    /**
     * Visits not equal expression.
     * 
     * @param {NotEqExpression} notEqExpression Not equal expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotEqExpression(notEqExpression: NotEqExpression): string;

    /**
     * Visits in expression.
     * 
     * @param {InExpression} inExpression In expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitInExpression(inExpression: InExpression): string;

    /**
     * Visits not in expression.
     * 
     * @param {NotInExpression} notInExpression Not in expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotInExpression(notInExpression: NotInExpression): string;

    /**
     * Visits greater than expression.
     * 
     * @param {GtExpression} gtExpression Greater than expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitGtExpression(gtExpression: GtExpression): string;

    /**
     * Visits greater than or equal expression.
     * 
     * @param {GteExpression} gteExpression Greater than or equal expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitGteExpression(gteExpression: GteExpression): string;

    /**
     * Visits lower than expression.
     * 
     * @param {LtExpression} ltExpression Lower than expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitLtExpression(ltExpression: LtExpression): string;

    /**
     * Visits lower than or equal expression.
     * 
     * @param {LteExpression} lteExpression Lower than or equal expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitLteExpression(lteExpression: LteExpression): string;

    /**
     * Visits contains expression.
     * 
     * @param {ContainsExpression} containsExpression Contains expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitContainsExpression(containsExpression: ContainsExpression): string;

    /**
     * Visits not contains expression.
     * 
     * @param {NotContainsExpression} notContainsExpression Not contains expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotContainsExpression(notContainsExpression: NotContainsExpression): string;

    /**
     * Visits starts with expression.
     * 
     * @param {StartsWithExpression} startsWithExpression Starts with expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitStartsWithExpression(startsWithExpression: StartsWithExpression): string;

    /**
     * Visits not starts with expression.
     * 
     * @param {NotStartsWithExpression} notStartsWithExpression Not starts with expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotStartsWithExpression(notStartsWithExpression: NotStartsWithExpression): string;

    /**
     * Visits ends with expression.
     * 
     * @param {EndsWithExpression} endsWithExpression Ends with expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitEndsWithExpression(endsWithExpression: EndsWithExpression): string;

    /**
     * Visits not ends with expression.
     * 
     * @param {NotEndsWithExpression} notEndsWithExpression Not ends with expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitNotEndsWithExpression(notEndsWithExpression: NotEndsWithExpression): string;

    /**
     * Visits and expression.
     * 
     * @param {AndExpression} andExpression And expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitAndExpression(andExpression: AndExpression): string;

    /**
     * Visits or expression.
     * 
     * @param {OrExpression} orExpression Or expression.
     * 
     * @returns {string} Expression result.
     */
    public abstract visitOrExpression(orExpression: OrExpression): string;
}
