import isArray from 'lodash/isArray';
import { TypeMetadata } from '@dipscope/type-manager';
import { AddCommandBuilder } from './command-builders/add-command-builder';
import { BrowseCommandBuilder } from './command-builders/browse-command-builder';
import { BulkAddCommandBuilder } from './command-builders/bulk-add-command-builder';
import { BulkRemoveCommandBuilder } from './command-builders/bulk-remove-command-builder';
import { BulkSaveCommandBuilder } from './command-builders/bulk-save-command-builder';
import { BulkUpdateCommandBuilder } from './command-builders/bulk-update-command-builder';
import { IncludeBrowseCommandBuilder } from './command-builders/include-browse-command-builder';
import { QueryCommandBuilder } from './command-builders/query-command-builder';
import { RemoveCommandBuilder } from './command-builders/remove-command-builder';
import { RootBrowseCommandBuilder } from './command-builders/root-browse-command-builder';
import { SaveCommandBuilder } from './command-builders/save-command-builder';
import { SortBrowseCommandBuilder } from './command-builders/sort-browse-command-builder';
import { UpdateCommandBuilder } from './command-builders/update-command-builder';
import { Entity } from './entity';
import { EntityCollection } from './entity-collection';
import { EntityProvider } from './entity-provider';
import { FilterClause } from './filter-clause';
import { IncludeClause, IncludeCollectionClause } from './include-clause';
import { KeyValue } from './key-value';
import { Nullable } from './nullable';
import { PaginateClause } from './paginate-clause';
import { PaginatedEntityCollection } from './paginated-entity-collection';
import { SortClause } from './sort-clause';

/**
 * Entity set which allows manipulations over a certain entity type.
 * 
 * @type {EntitySet<TEntity>}
 */
export class EntitySet<TEntity extends Entity> 
{
    /**
     * Entity type metadata.
     * 
     * @type {TypeMetadata<TEntity>}
     */
    public readonly typeMetadata: TypeMetadata<TEntity>;

    /**
     * Entity provider.
     * 
     * @type {EntityProvider}
     */
    public readonly entityProvider: EntityProvider;

    /**
     * Constructor.
     * 
     * @param {TypeMetadata<TEntity>} typeMetadata Entity type metadata.
     * @param {EntityProvider} entityProvider Entity provider.
     */
    public constructor(typeMetadata: TypeMetadata<TEntity>, entityProvider: EntityProvider) 
    {
        this.typeMetadata = typeMetadata;
        this.entityProvider = entityProvider;

        return;
    }

    /**
     * Filters entity set.
     * 
     * @param {FilterClause<TEntity>} filterClause Filter clause.
     * 
     * @returns {RootBrowseCommandBuilder<TEntity>} Root browse command builder.
     */
    public filter(filterClause: FilterClause<TEntity>): RootBrowseCommandBuilder<TEntity> 
    {
        return new BrowseCommandBuilder<TEntity, any>(this).filter(filterClause);
    }

    /**
     * Sorts entity set in ascending order.
     * 
     * @param {SortClause<TEntity, TProperty>} sortClause Sort clause.
     * 
     * @returns {SortBrowseCommandBuilder<TEntity>} Sort browse command builder.
     */
    public sortByAsc<TProperty>(sortClause: SortClause<TEntity, TProperty>): SortBrowseCommandBuilder<TEntity>
    {
        return new BrowseCommandBuilder<TEntity, any>(this).sortByAsc(sortClause);
    }

    /**
     * Sorts entity set in descending order.
     * 
     * @param {SortClause<TEntity, TProperty>} sortClause Sort clause.
     * 
     * @returns {SortBrowseCommandBuilder<TEntity>} Sort browse command builder.
     */
    public sortByDesc<TProperty>(sortClause: SortClause<TEntity, TProperty>): SortBrowseCommandBuilder<TEntity>
    {
        return new BrowseCommandBuilder<TEntity, any>(this).sortByDesc(sortClause);
    }

    /**
     * Includes entity for eager loading.
     * 
     * @param {IncludeClause<TEntity, TProperty>} includeClause Include clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TProperty>} Include browse command builder.
     */
    public include<TProperty extends Entity>(includeClause: IncludeClause<TEntity, TProperty>): IncludeBrowseCommandBuilder<TEntity, TProperty>
    {
        return new BrowseCommandBuilder<TEntity, any>(this).include(includeClause);
    }
    
    /**
     * Includes entity collection for eager loading.
     * 
     * @param {IncludeCollectionClause<TEntity, TProperty>} includeCollectionClause Include collection clause.
     * 
     * @returns {IncludeBrowseCommandBuilder<TEntity, TProperty>} Include browse command builder.
     */
    public includeCollection<TProperty extends Entity>(includeCollectionClause: IncludeCollectionClause<TEntity, TProperty>): IncludeBrowseCommandBuilder<TEntity, TProperty> 
    {
        return new BrowseCommandBuilder<TEntity, any>(this).includeCollection(includeCollectionClause);
    }

    /**
     * Paginates entity set.
     * 
     * @param {PaginateClause<TEntity>} paginateClause Paginate clause.
     * 
     * @returns {RootBrowseCommandBuilder<TEntity>} Root browse command builder.
     */
    public paginate(paginateClause: PaginateClause<TEntity>): RootBrowseCommandBuilder<TEntity>
    {
        return new BrowseCommandBuilder<TEntity, any>(this).paginate(paginateClause);
    }
    
    /**
     * Finds all entities in a set.
     * 
     * @returns {Promise<PaginatedEntityCollection<TEntity>>} Paginated entity collection.
     */
    public findAll(): Promise<PaginatedEntityCollection<TEntity>>
    {
        return new BrowseCommandBuilder(this).findAll();
    }
    
    /**
     * Finds one entity in a set.
     * 
     * @returns {Promise<Nullable<TEntity>>} Entity or null.
     */
    public findOne(): Promise<Nullable<TEntity>> 
    {
        return new BrowseCommandBuilder(this).findOne();
    }

    /**
     * Finds one entity in a set or throws an exception.
     * 
     * @returns {Promise<TEntity>} Entity or error.
     */
    public findOneOrFail(): Promise<TEntity> 
    {
        return new BrowseCommandBuilder(this).findOneOrFail();
    }

    /**
     * Finds entity by key values.
     * 
     * @param {ReadonlyArray<KeyValue>} keyValues Readonly array of key values.
     * 
     * @returns {Promise<Nullable<TEntity>>} Entity or null when entity not found.
     */
    public find(...keyValues: ReadonlyArray<KeyValue>): Promise<Nullable<TEntity>>
    {
        return new QueryCommandBuilder<TEntity>(this, keyValues).query();
    }

    /**
     * Finds entity by key values or throws an error.
     * 
     * @param {ReadonlyArray<KeyValue>} keyValues Readonly array of key values.
     * 
     * @returns {Promise<TEntity>} Entity or error.
     */
    public findOrFail(...keyValues: ReadonlyArray<KeyValue>): Promise<TEntity>
    {
        return new QueryCommandBuilder<TEntity>(this, keyValues).queryOrFail();
    }

    /**
     * Adds an entity.
     * 
     * @param {TEntity} entity Entity which should be added.
     * 
     * @returns {Promise<TEntity>} Added entity.
     */
    public add(entity: TEntity): Promise<TEntity>
    {
        return new AddCommandBuilder<TEntity>(this, entity).add();
    }

    /**
     * Bulk adds an entity collection.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be added.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Added entity collection.
     */
    public bulkAdd(entityCollection: EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkAdd(entities: Array<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkAdd(entityCollectionOrEntities: Array<TEntity> | EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>
    {
        const entityCollection = isArray(entityCollectionOrEntities) ? new EntityCollection<TEntity>(entityCollectionOrEntities) : entityCollectionOrEntities;

        return new BulkAddCommandBuilder(this, entityCollection).add();
    }

    /**
     * Updates an entity.
     * 
     * @param {TEntity} entity Entity which should be updated.
     * 
     * @returns {Promise<TEntity>} Updated entity.
     */
    public update(entity: TEntity): Promise<TEntity>
    {
        return new UpdateCommandBuilder<TEntity>(this, entity).update();
    }

    /**
     * Bulk updates an entity collection.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be added.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Added entity collection.
     */
    public bulkUpdate(entityCollection: EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkUpdate(entities: Array<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkUpdate(entityCollectionOrEntities: Array<TEntity> | EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>
    {
        const entityCollection = isArray(entityCollectionOrEntities) ? new EntityCollection<TEntity>(entityCollectionOrEntities) : entityCollectionOrEntities;

        return new BulkUpdateCommandBuilder(this, entityCollection).update();
    }

    /**
     * Batch updates an entity collection.
     * 
     * @param {Partial<TEntity>} entityPartial Entity partial.
     * 
     * @returns {Promise<void>} Batch update promise.
     */
    public batchUpdate(entityPartial: Partial<TEntity>): Promise<void>
    {
        return new BrowseCommandBuilder(this).update(entityPartial);
    }

    /**
     * Saves an entity.
     * 
     * @param {TEntity} entity Entity which should be saved.
     * 
     * @returns {Promise<TEntity>} Saved entity.
     */
    public save(entity: TEntity): Promise<TEntity>
    {
        return new SaveCommandBuilder<TEntity>(this, entity).save();
    }

    /**
     * Bulk saves an entity collection.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be saved.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Saved entity collection.
     */
    public bulkSave(entityCollection: EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkSave(entities: Array<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkSave(entityCollectionOrEntities: Array<TEntity> | EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>
    {
        const entityCollection = isArray(entityCollectionOrEntities) ? new EntityCollection<TEntity>(entityCollectionOrEntities) : entityCollectionOrEntities;

        return new BulkSaveCommandBuilder(this, entityCollection).save();
    }

    /**
     * Removes an entity.
     * 
     * @param {TEntity} entity Entity which should be removed.
     * 
     * @returns {Promise<TEntity>} Removed entity.
     */
    public remove(entity: TEntity): Promise<TEntity>
    {
        return new RemoveCommandBuilder<TEntity>(this, entity).remove();
    }

    /**
     * Bulk removes an entity collection.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be removed.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Removed entity collection.
     */
    public bulkRemove(entityCollection: EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkRemove(entities: Array<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkRemove(entityCollectionOrEntities: Array<TEntity> | EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>
    {
        const entityCollection = isArray(entityCollectionOrEntities) ? new EntityCollection<TEntity>(entityCollectionOrEntities) : entityCollectionOrEntities;

        return new BulkRemoveCommandBuilder(this, entityCollection).remove();
    }

    /**
     * Batch removes an entity collection.
     * 
     * @returns {Promise<void>} Batch remove promise.
     */
    public batchRemove(): Promise<void>
    {
        return new BrowseCommandBuilder(this).remove();
    }
}
