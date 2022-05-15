import { Fn, PropertyMetadata, TypeMetadata } from '@dipscope/type-manager/core';

import { CommandBuilder } from '../command-builder';
import { BatchDeleteCommand } from '../commands/batch-delete-command';
import { BatchUpdateCommand } from '../commands/batch-update-command';
import { BrowseCommand } from '../commands/browse-command';
import { BulkQueryCommand } from '../commands/bulk-query-command';
import { Entity } from '../entity';
import { EntityCollection } from '../entity-collection';
import { EntityInfoProxyRoot } from '../entity-info-proxy';
import { EntityInfoProxyHandler } from '../entity-info-proxy-handler';
import { EntitySet } from '../entity-set';
import { GenericMetadataNotFoundError } from '../errors/generic-metadata-not-found-error';
import { FilterClause } from '../filter-clause';
import { FilterExpression } from '../filter-expression';
import { FilterExpressionBuilder } from '../filter-expression-builder';
import { AndFilterExpression } from '../filter-expressions/and-filter-expression';
import { IncludeClause, IncludeCollectionClause, ThenIncludeClause, ThenIncludeCollectionClause } from '../include-clause';
import { IncludeExpression } from '../include-expression';
import { Nullable } from '../nullable';
import { PaginateExpression } from '../paginate-expression';
import { PropertyInfo } from '../property-info';
import { PropertyInfoProxyRoot } from '../property-info-proxy';
import { PropertyInfoProxyHandler } from '../property-info-proxy-handler';
import { proxyTargetSymbol } from '../proxy-target-symbol';
import { SortClause } from '../sort-clause';
import { SortExpression } from '../sort-expression';
import { AscSortExpression } from '../sort-expressions/asc-sort-expression';
import { DescSortExpression } from '../sort-expressions/desc-sort-expression';
import { IncludeBrowseCommandBuilder } from './include-browse-command-builder';
import { RootBrowseCommandBuilder } from './root-browse-command-builder';
import { SortBrowseCommandBuilder } from './sort-browse-command-builder';

/**
 * Browse command builder.
 * 
 * @type {BrowseCommandBuilder<TEntity>}
 */
export class BrowseCommandBuilder<TEntity extends Entity, TBrowseProperty extends Entity> extends CommandBuilder<BrowseCommand<TEntity, unknown>, TEntity, unknown>
    implements RootBrowseCommandBuilder<TEntity>, SortBrowseCommandBuilder<TEntity>, IncludeBrowseCommandBuilder<TEntity, TBrowseProperty>
{
    /**
     * Proxy root for attached entity info.
     * 
     * @type {EntityInfoProxyRoot<TEntity>}
     */
    protected entityInfoProxyRoot: EntityInfoProxyRoot<TEntity>;

    /**
     * Proxy root for attached property info.
     * 
     * @type {PropertyInfoProxyRoot<TBrowseProperty>}
     */
    protected propertyInfoProxyRoot: PropertyInfoProxyRoot<TBrowseProperty>;
    
    /**
     * Expression builder to build filter expressions.
     * 
     * @type {FilterExpressionBuilder}
     */
    protected filterExpressionBuilder: FilterExpressionBuilder;

    /**
     * Current filter expression.
     * 
     * @type {FilterExpression}
     */
    protected filterExpression?: FilterExpression;

    /**
     * Current sort expression.
     * 
     * @type {SortExpression}
     */
    protected sortExpression?: SortExpression;

    /**
     * Current include expression.
     * 
     * @type {IncludeExpression}
     */
    protected includeExpression?: IncludeExpression;

    /**
     * Current paginate expression.
     * 
     * @type {PaginateExpression}
     */
    protected paginateExpression?: PaginateExpression;

    /**
     * Constructor.
     * 
     * @param {EntitySet<TEntity>} entitySet Entity set.
     */
    public constructor(entitySet: EntitySet<TEntity>)
    {
        super(entitySet);

        this.entityInfoProxyRoot = new Proxy<any>(this.entityInfo, new EntityInfoProxyHandler());
        this.propertyInfoProxyRoot = new Proxy<any>(this.entityInfo, new PropertyInfoProxyHandler());
        this.filterExpressionBuilder = new FilterExpressionBuilder();

        return;
    }

    /**
     * Builds a command.
     * 
     * @returns {BulkQueryCommand<TEntity>} Bulk query command.
     */
    protected build(): BulkQueryCommand<TEntity>
    {
        return new BulkQueryCommand(this.entityInfo, this.filterExpression, this.sortExpression, this.includeExpression, this.paginateExpression);
    }

    /**
     * Filters browsed entity collection.
     * 
     * @param {FilterClause<TEntity>} filterClause Filter clause.
     * 
     * @returns {RootBrowseCommandBuilder<TEntity>} Root browse command builder.
     */
    public where(filterClause: FilterClause<TEntity>): RootBrowseCommandBuilder<TEntity>
    {
        const filterExpression = filterClause(this.entityInfoProxyRoot, this.filterExpressionBuilder);

        this.filterExpression = Fn.isNil(this.filterExpression) ? filterExpression : new AndFilterExpression(this.filterExpression, filterExpression);

        return this;
    }

    /**
     * Sorts entity collection returned by the query in ascending order.
     * 
     * @param {SortClause<TEntity, TProperty>} sortClause Sort clause.
     * 
     * @returns {SortBrowseCommandBuilder<TEntity>} Sort browse command builder.
     */
    public sortByAsc<TProperty>(sortClause: SortClause<TEntity, TProperty>): SortBrowseCommandBuilder<TEntity>
    {
        const propertyInfoProxy = sortClause(this.entityInfoProxyRoot);

        this.sortExpression = new AscSortExpression(propertyInfoProxy[proxyTargetSymbol]);

        return this;
    }
    
    /**
     * Applies ascending child sort for an entity collection.
     * 
     * @param {SortClause<TEntity, TProperty>} sortClause Sort clause.
     * 
     * @returns {SortBrowseCommandBuilder<TEntity>} Sort browse command builder.
     */
    public thenSortByAsc<TProperty>(sortClause: SortClause<TEntity, TProperty>): SortBrowseCommandBuilder<TEntity> 
    {
        const propertyInfoProxy = sortClause(this.entityInfoProxyRoot);

        this.sortExpression = new AscSortExpression(propertyInfoProxy[proxyTargetSymbol], this.sortExpression);

        return this;
    }

    /**
     * Sorts entity collection returned by the query in descending order.
     * 
     * @param {SortClause<TEntity, TProperty>} sortClause Sort clause.
     * 
     * @returns {SortBrowseCommandBuilder<TEntity>} Sort browse command builder.
     */
    public sortByDesc<TProperty>(sortClause: SortClause<TEntity, TProperty>): SortBrowseCommandBuilder<TEntity>
    {
        const propertyInfoProxy = sortClause(this.entityInfoProxyRoot);

        this.sortExpression = new DescSortExpression(propertyInfoProxy[proxyTargetSymbol]);

        return this;
    }

    /**
     * Applies descending child sort for an entity collection.
     * 
     * @param {SortClause<TEntity, TProperty>} sortClause Sort clause.
     * 
     * @returns {SortBrowseCommandBuilder<TEntity>} Sort browse command builder.
     */
    public thenSortByDesc<TProperty>(sortClause: SortClause<TEntity, TProperty>): SortBrowseCommandBuilder<TEntity> 
    {
        const propertyInfoProxy = sortClause(this.entityInfoProxyRoot);

        this.sortExpression = new DescSortExpression(propertyInfoProxy[proxyTargetSymbol], this.sortExpression);

        return this;
    }

    /**
     * Includes entity for eager loading.
     * 
     * @param {IncludeClause<TEntity, TProperty>} includeClause Include clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TProperty>} Include browse command builder.
     */
    public include<TProperty>(includeClause: IncludeClause<TEntity, TProperty>): IncludeBrowseCommandBuilder<TEntity, TProperty> 
    {
        const propertyInfoProxy = includeClause(this.entityInfoProxyRoot);
        const propertyInfo = propertyInfoProxy[proxyTargetSymbol];

        this.includeExpression = new IncludeExpression(propertyInfo, this.includeExpression, this.entityInfo);
        this.propertyInfoProxyRoot = new Proxy<any>(propertyInfo, new PropertyInfoProxyHandler());

        return this as unknown as IncludeBrowseCommandBuilder<TEntity, TProperty>;
    }

    /**
     * Includes child entity for eager browsing.
     * 
     * @param {ThenIncludeClause<TBrowseProperty, TChildProperty>} thenIncludeClause Then include clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TChildProperty>} Include browse command builder.
     */
    public thenInclude<TChildProperty>(thenIncludeClause: ThenIncludeClause<TBrowseProperty, TChildProperty>): IncludeBrowseCommandBuilder<TEntity, TChildProperty>
    {
        const propertyInfoProxy = thenIncludeClause(this.propertyInfoProxyRoot);
        const propertyInfo = propertyInfoProxy[proxyTargetSymbol];

        this.includeExpression = new IncludeExpression(propertyInfo, this.includeExpression);
        this.propertyInfoProxyRoot = new Proxy<any>(propertyInfo, new PropertyInfoProxyHandler());

        return this as unknown as IncludeBrowseCommandBuilder<TEntity, TChildProperty>;
    }

    /**
     * Includes entity collection for eager loading.
     * 
     * @param {IncludeCollectionClause<TEntity, TProperty>} includeCollectionClause Include collection clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TProperty>} Include browse command builder.
     */
    public includeCollection<TProperty>(includeCollectionClause: IncludeCollectionClause<TEntity, TProperty>): IncludeBrowseCommandBuilder<TEntity, TProperty> 
    {
        const propertyInfoProxy = includeCollectionClause(this.entityInfoProxyRoot);
        const collectionPropertyInfo = propertyInfoProxy[proxyTargetSymbol];
        const collectionPropertyMetadata = collectionPropertyInfo.propertyMetadata;
        const collectionGenericMetadatas = collectionPropertyMetadata.genericMetadatas;

        if (Fn.isNil(collectionGenericMetadatas) || Fn.isEmpty(collectionGenericMetadatas))
        {
            throw new GenericMetadataNotFoundError(collectionPropertyInfo.path);
        }

        const propertyMetadata = collectionPropertyMetadata as PropertyMetadata<TEntity, any>;
        const entityTypeMetadata = collectionGenericMetadatas[0][0] as TypeMetadata<TProperty>;
        const propertyInfo = new PropertyInfo<TProperty>(collectionPropertyInfo.path, propertyMetadata, entityTypeMetadata, collectionPropertyInfo.parentPropertyInfo);

        this.includeExpression = new IncludeExpression(collectionPropertyInfo, this.includeExpression, this.entityInfo);
        this.propertyInfoProxyRoot = new Proxy<any>(propertyInfo, new PropertyInfoProxyHandler());

        return this as unknown as IncludeBrowseCommandBuilder<TEntity, TProperty>;
    }

    /**
     * Includes child entity collection for eager browsing.
     * 
     * @param {ThenIncludeCollectionClause<TBrowseProperty, TChildProperty>} thenIncludeCollectionClause Then include collection clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TChildProperty>} Include browse command builder.
     */
    public thenIncludeCollection<TChildProperty>(thenIncludeCollectionClause: ThenIncludeCollectionClause<TBrowseProperty, TChildProperty>): IncludeBrowseCommandBuilder<TEntity, TChildProperty>
    {
        const propertyInfoProxy = thenIncludeCollectionClause(this.propertyInfoProxyRoot);
        const collectionPropertyInfo = propertyInfoProxy[proxyTargetSymbol];
        const collectionPropertyMetadata = collectionPropertyInfo.propertyMetadata;
        const collectionGenericMetadatas = collectionPropertyMetadata.genericMetadatas;

        if (Fn.isNil(collectionGenericMetadatas) || Fn.isEmpty(collectionGenericMetadatas))
        {
            throw new GenericMetadataNotFoundError(collectionPropertyInfo.path);
        }

        const propertyMetadata = collectionPropertyMetadata as PropertyMetadata<TChildProperty, any>;
        const entityTypeMetadata = collectionGenericMetadatas[0][0] as TypeMetadata<TChildProperty>;
        const propertyInfo = new PropertyInfo<TChildProperty>(collectionPropertyInfo.path, propertyMetadata, entityTypeMetadata, collectionPropertyInfo.parentPropertyInfo);

        this.includeExpression = new IncludeExpression(collectionPropertyInfo, this.includeExpression);
        this.propertyInfoProxyRoot = new Proxy<any>(propertyInfo, new PropertyInfoProxyHandler());

        return this as unknown as IncludeBrowseCommandBuilder<TEntity, TChildProperty>;
    }

    /**
     * Skips a certain amount of entities.
     * 
     * @param {number} count Number of entities to skip.
     * 
     * @returns {RootBrowseCommandBuilder<TEntity>} Root browse command builder.
     */
    public skip(count: number): RootBrowseCommandBuilder<TEntity>
    {
        this.paginateExpression = new PaginateExpression(this.entityInfo, count, this.paginateExpression?.take);

        return this;
    }

    /**
     * Takes a certain amount of entities.
     * 
     * @param {number} count Number of entities to take.
     * 
     * @returns {RootBrowseCommandBuilder<TEntity>} Root browse command builder.
     */
    public take(count: number): RootBrowseCommandBuilder<TEntity>
    {
        this.paginateExpression = new PaginateExpression(this.entityInfo, this.paginateExpression?.skip, count);

        return this;
    }

    /**
     * Finds all entities which match command expressions.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Entity collection.
     */
    public async findAll(): Promise<EntityCollection<TEntity>>
    {
        const entityCollection = await this.build().delegate(this.entityProvider);

        return entityCollection;
    }

    /**
     * Finds one entity which matches command expressions.
     * 
     * @returns {Promise<Nullable<TEntity>>} Entity or null when nothing matches.
     */
    public async findOne(): Promise<Nullable<TEntity>>
    {
        const entityCollection = await this.take(1).findAll();
        const entity = entityCollection.first();

        return entity;
    }
    
    /**
     * Updates entities which matches command expressions.
     * 
     * @param {Partial<TEntity>} entityPartial Entity partial.
     * 
     * @returns {Promise<void>}
     */
    public async update(entityPartial: Partial<TEntity>): Promise<void>
    {
        const batchUpdateCommand = new BatchUpdateCommand(this.entityInfo, entityPartial, this.filterExpression, this.sortExpression, this.includeExpression, this.paginateExpression);

        await batchUpdateCommand.delegate(this.entityProvider);

        return;
    }

    /**
     * Deletes entities which matches command expressions.
     * 
     * @returns {Promise<void>}
     */
    public async delete(): Promise<void>
    {
        const batchDeleteCommand = new BatchDeleteCommand(this.entityInfo, this.filterExpression, this.sortExpression, this.includeExpression, this.paginateExpression);

        await batchDeleteCommand.delegate(this.entityProvider);

        return;
    }
}
