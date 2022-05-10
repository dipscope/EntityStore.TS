import {
    Fn, ReferenceCallback, ReferenceKey, ReferenceValue, SerializerContext
} from '@dipscope/type-manager/core';

import { ExpressionVisitor } from '../../expression-visitor';
import { AndExpression } from '../../expressions/and-expression';
import { ContainsExpression } from '../../expressions/contains-expression';
import { EndsWithExpression } from '../../expressions/ends-with-expression';
import { EqExpression } from '../../expressions/eq-expression';
import { GtExpression } from '../../expressions/gt-expression';
import { GteExpression } from '../../expressions/gte-expression';
import { InExpression } from '../../expressions/in-expression';
import { IncludeExpression } from '../../expressions/include-expression';
import { LtExpression } from '../../expressions/lt-expression';
import { LteExpression } from '../../expressions/lte-expression';
import { NotContainsExpression } from '../../expressions/not-contains-expression';
import { NotEndsWithExpression } from '../../expressions/not-ends-with-expression';
import { NotEqExpression } from '../../expressions/not-eq-expression';
import { NotInExpression } from '../../expressions/not-in-expression';
import { NotStartsWithExpression } from '../../expressions/not-starts-with-expression';
import { OrExpression } from '../../expressions/or-expression';
import { OrderExpression } from '../../expressions/order-expression';
import { StartsWithExpression } from '../../expressions/starts-with-expression';
import { OrderDirection } from '../../order-direction';
import { PropertyInfo } from '../../property-info';

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
        const orderDirection = orderExpression.orderDirection === OrderDirection.Asc ? '' : '-';
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
