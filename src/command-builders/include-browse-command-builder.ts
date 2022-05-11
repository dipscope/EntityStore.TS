import { Fn, PropertyMetadata, TypeMetadata } from '@dipscope/type-manager/core';

import { Entity } from '../entity';
import { EntitySet } from '../entity-set';
import { GenericMetadataNotFoundError } from '../errors/generic-metadata-not-found-error';
import { FilterExpression } from '../filter-expressions/filter-expression';
import { IncludeExpression } from '../filter-expressions/include-expression';
import { OrderExpression } from '../filter-expressions/order-expression';
import { ThenIncludeClause, ThenIncludeCollectionClause } from '../include-clause';
import { PropertyInfo } from '../property-info';
import { PropertyInfoProxyRoot } from '../property-info-proxy';
import { PropertyInfoProxyHandler } from '../property-info-proxy-handler';
import { proxyTargetSymbol } from '../proxy-target-symbol';
import { BrowseCommandBuilder } from './browse-command-builder';

/**
 * Include browse command builder.
 * 
 * @type {IncludeBrowseCommandBuilder<TEntity>}
 */
export class IncludeBrowseCommandBuilder<TEntity extends Entity, TProperty extends Entity> extends BrowseCommandBuilder<TEntity>
{
    /**
     * Property info.
     * 
     * @type {PropertyInfo<TProperty>}
     */
    protected propertyInfo: PropertyInfo<TProperty>;

    /**
     * Proxy root for attached property info.
     * 
     * @type {PropertyInfoProxyRoot<TEntity>}
     */
    protected propertyInfoProxyRoot: PropertyInfoProxyRoot<TProperty>;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     * @param {PropertyInfo<TProperty>} propertyInfo Property info.
     * @param {IncludeExpression} includeExpression Include expression.
     * @param {OrderExpression} orderExpression Order expression.
     * @param {FilterExpression} filterExpression Filter expression.
     * @param {number} offset Offset.
     * @param {number} limit Limit.
     */
    public constructor(
        entitySet: EntitySet<TEntity>,
        propertyInfo: PropertyInfo<TProperty>,
        includeExpression: IncludeExpression,
        orderExpression?: OrderExpression,
        filterExpression?: FilterExpression,
        offset?: number,
        limit?: number
    )
    {
        super(entitySet);

        this.propertyInfo = propertyInfo;
        this.propertyInfoProxyRoot = new Proxy<any>(propertyInfo, new PropertyInfoProxyHandler());
        this.includeExpression = includeExpression;
        this.filterExpression = filterExpression;
        this.orderExpression = orderExpression;
        this.offset = offset;
        this.limit = limit;

        return;
    }

    /**
     * Includes child entity for eager browsing.
     * 
     * @param {ThenIncludeClause<TProperty, TChildProperty>} thenIncludeClause Then include clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TChildProperty>} Include browse command builder.
     */
    public thenInclude<TChildProperty>(thenIncludeClause: ThenIncludeClause<TProperty, TChildProperty>): IncludeBrowseCommandBuilder<TEntity, TChildProperty>
    {
        const propertyInfoProxy = thenIncludeClause(this.propertyInfoProxyRoot);
        const propertyInfo = propertyInfoProxy[proxyTargetSymbol];

        this.includeExpression = new IncludeExpression(propertyInfo, this.includeExpression);

        return new IncludeBrowseCommandBuilder(this.entitySet, propertyInfo, this.includeExpression, this.orderExpression, this.filterExpression, this.offset, this.limit);
    }

    /**
     * Includes child entity collection for eager browsing.
     * 
     * @param {ThenIncludeCollectionClause<TProperty, TChildProperty>} thenIncludeCollectionClause Then include collection clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TChildProperty>} Include browse command builder.
     */
    public thenIncludeCollection<TChildProperty>(thenIncludeCollectionClause: ThenIncludeCollectionClause<TProperty, TChildProperty>): IncludeBrowseCommandBuilder<TEntity, TChildProperty>
    {
        const propertyInfoProxy = thenIncludeCollectionClause(this.propertyInfoProxyRoot);
        const collectionPropertyInfo = propertyInfoProxy[proxyTargetSymbol];
        const collectionPropertyMetadata = collectionPropertyInfo.propertyMetadata;
        const collectionGenericMetadatas = collectionPropertyMetadata.genericMetadatas;

        if (Fn.isNil(collectionGenericMetadatas) || Fn.isEmpty(collectionGenericMetadatas))
        {
            throw new GenericMetadataNotFoundError(collectionPropertyInfo.path);
        }

        const propertyMetadata = collectionPropertyMetadata as PropertyMetadata<TProperty, any>;
        const entityTypeMetadata = collectionGenericMetadatas[0][0] as TypeMetadata<TChildProperty>;
        const propertyInfo = new PropertyInfo<TChildProperty>(collectionPropertyInfo.path, propertyMetadata, entityTypeMetadata, collectionPropertyInfo.parentPropertyInfo);

        this.includeExpression = new IncludeExpression(collectionPropertyInfo, this.includeExpression);

        return new IncludeBrowseCommandBuilder(this.entitySet, propertyInfo, this.includeExpression, this.orderExpression, this.filterExpression, this.offset, this.limit);
    }
}
