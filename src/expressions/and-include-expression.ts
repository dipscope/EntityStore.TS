import { ExpressionVisitor } from '../expression-visitor';
import { IncludeExpression } from './include-expression';

/**
 * And include expression.
 * 
 * @type {AndIncludeExpression}
 */
export class AndIncludeExpression extends IncludeExpression
{
    /**
     * Array of underlying include expressions.
     * 
     * @type {ReadonlyArray<IncludeExpression>}
     */
    public readonly includeExpressions: ReadonlyArray<IncludeExpression>;

    /**
     * Constructor.
     * 
     * @param {IncludeExpression} firstIncludeExpression First include expression.
     * @param {IncludeExpression} secondIncludeExpression Second include expression.
     * @param {ReadonlyArray<IncludeExpression>} restIncludeExpressions Rest include expressions.
     */
    public constructor(firstIncludeExpression: IncludeExpression, secondIncludeExpression: IncludeExpression, ...restIncludeExpressions: ReadonlyArray<IncludeExpression>) 
    {
        super();

        this.includeExpressions = new Array<IncludeExpression>(firstIncludeExpression, secondIncludeExpression, ...restIncludeExpressions);

        return;
    }

    /**
     * Accepts a certain expression visitor.
     * 
     * @param {ExpressionVisitor<TResult>} expressionVisitor Expression visitor which returns a concrete result.
     * 
     * @returns {TResult} Expression visitor result.
     */
    public accept<TResult>(expressionVisitor: ExpressionVisitor<TResult>): TResult
    {
        return expressionVisitor.visitAndIncludeExpression(this);
    }
}
