import { ExpressionVisitor } from './expression-visitor';

export abstract class Expression
{
    public abstract accept(expressionVisitor: ExpressionVisitor): any;
}
