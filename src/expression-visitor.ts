import { AndExpression } from './expressions/and-expression';
import { EqExpression } from './expressions/eq-expression';

export interface ExpressionVisitor 
{
    visitEqExpression(eqExpression: EqExpression): any;
    visitAndExpression(andExpression: AndExpression): any;
}