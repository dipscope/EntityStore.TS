import { Expression } from '../expression';
import { ExpressionVisitor } from '../expression-visitor';

/**
 * And expression.
 * 
 * @type {AndExpression}
 */
export class AndExpression extends Expression
{
    /**
     * Array of underlying expressions.
     * 
     * @type {Array<Expression>}
     */
    public readonly expressions: Array<Expression>;

    /**
     * Constructor.
     * 
     * @param {Array<Expression>} expressions Array of underlying expressions.
     */
    public constructor(firstExpression: Expression, secondExpression: Expression, ...restExpressions: Array<Expression>) 
    {
        super();

        this.expressions = new Array<Expression>();

        this.expressions.push(firstExpression);
        this.expressions.push(secondExpression);
        this.expressions.push(...restExpressions);
        
        return;
    }

    public accept(expressionVisitor: ExpressionVisitor): any
    {
        return expressionVisitor.visitAndExpression(this);
    }
}
