import { PropertyInfo } from './property-info';

export class IncludeExpression
{
    public readonly propertyInfo: PropertyInfo<any>;

    public constructor(propertyInfo: PropertyInfo<any>)
    {
        this.propertyInfo = propertyInfo;

        return;
    }
}
