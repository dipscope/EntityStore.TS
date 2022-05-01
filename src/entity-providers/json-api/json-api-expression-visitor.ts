import { Expression } from '../../expression';
import { ExpressionVisitor } from '../../expression-visitor';
import { AndFilterExpression } from '../../expressions/and-filter-expression';
import { AndIncludeExpression } from '../../expressions/and-include-expression';
import { ContainsExpression } from '../../expressions/contains-expression';
import { EagerLoadingExpression } from '../../expressions/eager-loading-expression';
import { EndsWithExpression } from '../../expressions/ends-with-expression';
import { EqExpression } from '../../expressions/eq-expression';
import { FilterExpression } from '../../expressions/filter-expression';
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
import { OrFilterExpression } from '../../expressions/or-filter-expression';
import { OrderExpression } from '../../expressions/order-expression';
import { StartsWithExpression } from '../../expressions/starts-with-expression';
import { OrderDirection } from '../../order-direction';

export class JsonApiExpressionVisitor implements ExpressionVisitor<string> 
{
    /**
     * Visits base expression.
     * 
     * @param {Expression} expression Expression.
     * 
     * @returns {string} Expression result.
     */
    public visitExpression(expression: Expression): string 
    {
         return '';
    }

    /**
     * Visits filter expression.
     * 
     * @param {FilterExpression} filterExpression Filter expression.
     * 
     * @returns {string} Expression result.
     */
    public visitFilterExpression(filterExpression: FilterExpression): string
    {
        return '';
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
        const propertyPath = eqExpression.propertyInfo.propertyMetadata.propertyName; // TODO: Consider naming convention and alias.
        const value = eqExpression.value;

        return `filter[${propertyPath}][eq]=${value}`;
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
        const propertyPath = notEqExpression.propertyInfo.propertyMetadata.propertyName; // TODO: Consider naming convention and alias.
        const value = notEqExpression.value;

        return `filter[${propertyPath}][neq]=${value}`;
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
        return '';
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
        return '';
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
        return '';
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
        return '';
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
        return '';
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
        return '';
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
        return '';
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
        return '';
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
        return '';
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
        return '';
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
        return '';
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
        return '';
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
        return '';
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
        return '';
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
        return '';
    }

    /**
     * Visits eager loading expression.
     * 
     * @param {EagerLoadingExpression} eagerLoadingExpression Eager loading expression.
     * 
     * @returns {string} Expression result.
     */
    public visitEagerLoadingExpression(eagerLoadingExpression: EagerLoadingExpression): string
    {
        return '';
    }

    /**
     * Visits and include expression.
     * 
     * @param {AndIncludeExpression} andIncludeExpression And include expression.
     * 
     * @returns {string} Expression result.
     */
    public visitAndIncludeExpression(andIncludeExpression: AndIncludeExpression): string
    {
        return '';
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
        const orderSign = orderExpression.orderDirection === OrderDirection.Asc ? '' : '-';
        const propertyName = orderExpression.propertyInfo.propertyMetadata.propertyName;

        return `sort=${orderSign}${propertyName}`;
    }
}