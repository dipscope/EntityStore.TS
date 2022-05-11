import { FilterExpression } from '../filter-expression';
import { FilterExpressionVisitor } from '../filter-expression-visitor';

/**
 * And filter expression.
 * 
 * @type {AndFilterExpression}
 */
export class AndFilterExpression implements FilterExpression
{
    /**
     * Array of underlying filter expressions.
     * 
     * @type {ReadonlyArray<FilterExpression>}
     */
    public readonly filterExpressions: ReadonlyArray<FilterExpression>;

    /**
     * Constructor.
     * 
     * @param {FilterExpression} firstFilterExpression First filter expression.
     * @param {FilterExpression} secondFilterExpression Second filter expression.
     * @param {ReadonlyArray<FilterExpression>} restFilterExpressions Rest filter expressions.
     */
    public constructor(firstFilterExpression: FilterExpression, secondFilterExpression: FilterExpression, ...restFilterExpressions: ReadonlyArray<FilterExpression>) 
    {
        this.filterExpressions = new Array<FilterExpression>(firstFilterExpression, secondFilterExpression, ...restFilterExpressions);

        return;
    }

    /**
     * Accepts a certain filter expression visitor.
     * 
     * @param {FilterExpressionVisitor<TResult>} filterExpressionVisitor Filter expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Filter expression visitor result.
     */
    public accept<TResult>(filterExpressionVisitor: FilterExpressionVisitor<TResult>): TResult
    {
        return filterExpressionVisitor.visitAndFilterExpression(this);
    }
}
