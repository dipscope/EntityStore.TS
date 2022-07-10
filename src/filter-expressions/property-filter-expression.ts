import { FilterExpression } from '../filter-expression';
import { PropertyInfo } from '../property-info';

/**
 * Property filter expression.
 * 
 * @type {PropertyFilterExpression}
 */
export abstract class PropertyFilterExpression extends FilterExpression
{
    /**
     * Property info attached to expression.
     * 
     * @type {PropertyInfo<any>}
     */
    public readonly propertyInfo: PropertyInfo<any>;

    /**
     * Constructor.
     * 
     * @param {PropertyInfo<any>} propertyInfo Property info attached to expression.
     */
    public constructor(propertyInfo: PropertyInfo<any>)
    {
        super();

        this.propertyInfo = propertyInfo;

        return;
    }
}
