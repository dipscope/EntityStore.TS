import { Fn, TypeMetadata } from '@dipscope/type-manager/core';

import { BrowseCommandBuilder } from './command-builders/browse-command-builder';
import { BulkCreateCommandBuilder } from './command-builders/bulk-create-command-builder';
import { BulkDeleteCommandBuilder } from './command-builders/bulk-delete-command-builder';
import { BulkSaveCommandBuilder } from './command-builders/bulk-save-command-builder';
import { BulkUpdateCommandBuilder } from './command-builders/bulk-update-command-builder';
import { CreateCommandBuilder } from './command-builders/create-command-builder';
import { DeleteCommandBuilder } from './command-builders/delete-command-builder';
import { IncludeBrowseCommandBuilder } from './command-builders/include-browse-command-builder';
import { QueryCommandBuilder } from './command-builders/query-command-builder';
import { SaveCommandBuilder } from './command-builders/save-command-builder';
import { SortBrowseCommandBuilder } from './command-builders/sort-browse-command-builder';
import { UpdateCommandBuilder } from './command-builders/update-command-builder';
import { Entity } from './entity';
import { EntityCollection } from './entity-collection';
import { EntityProvider } from './entity-provider';
import { FilterClause } from './filter-clause';
import { IncludeClause } from './include-clause';
import { KeyValue } from './key-value';
import { Nullable } from './nullable';
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
     * @returns {BrowseCommandBuilder<TEntity>} Browse command builder.
     */
    public where(filterClause: FilterClause<TEntity>): BrowseCommandBuilder<TEntity> 
    {
        return new BrowseCommandBuilder<TEntity>(this).where(filterClause);
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
        return new BrowseCommandBuilder<TEntity>(this).sortByAsc(sortClause);
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
        return new BrowseCommandBuilder<TEntity>(this).sortByDesc(sortClause);
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
        return new BrowseCommandBuilder<TEntity>(this).include(includeClause);
    }
    
    /**
     * Finds all entities in a set.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Entity collection.
     */
    public findAll(): Promise<EntityCollection<TEntity>>
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
     * Creates an entity.
     * 
     * @param {TEntity} entity Entity which should be created.
     * 
     * @returns {Promise<TEntity>} Created entity.
     */
    public create(entity: TEntity): Promise<TEntity>
    {
        return new CreateCommandBuilder<TEntity>(this, entity).create();
    }

    /**
     * Bulk creates an entity collection.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be created.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Created entity collection.
     */
    public bulkCreate(entityCollection: EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkCreate(entities: Array<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkCreate(entityCollectionOrEntities: Array<TEntity> | EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>
    {
        const entityCollection = Fn.isArray(entityCollectionOrEntities) ? new EntityCollection<TEntity>(entityCollectionOrEntities) : entityCollectionOrEntities;

        return new BulkCreateCommandBuilder(this, entityCollection).create();
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
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be created.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Created entity collection.
     */
    public bulkUpdate(entityCollection: EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkUpdate(entities: Array<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkUpdate(entityCollectionOrEntities: Array<TEntity> | EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>
    {
        const entityCollection = Fn.isArray(entityCollectionOrEntities) ? new EntityCollection<TEntity>(entityCollectionOrEntities) : entityCollectionOrEntities;

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
        const entityCollection = Fn.isArray(entityCollectionOrEntities) ? new EntityCollection<TEntity>(entityCollectionOrEntities) : entityCollectionOrEntities;

        return new BulkSaveCommandBuilder(this, entityCollection).save();
    }

    /**
     * Deletes an entity.
     * 
     * @param {TEntity} entity Entity which should be deleted.
     * 
     * @returns {Promise<TEntity>} Deleted entity.
     */
    public delete(entity: TEntity): Promise<TEntity>
    {
        return new DeleteCommandBuilder<TEntity>(this, entity).delete();
    }

    /**
     * Bulk deletes an entity collection.
     * 
     * @param {EntityCollection<TEntity>} entityCollection Entity collection which should be deleted.
     * 
     * @returns {Promise<EntityCollection<TEntity>>} Deleted entity collection.
     */
    public bulkDelete(entityCollection: EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkDelete(entities: Array<TEntity>): Promise<EntityCollection<TEntity>>;
    public bulkDelete(entityCollectionOrEntities: Array<TEntity> | EntityCollection<TEntity>): Promise<EntityCollection<TEntity>>
    {
        const entityCollection = Fn.isArray(entityCollectionOrEntities) ? new EntityCollection<TEntity>(entityCollectionOrEntities) : entityCollectionOrEntities;

        return new BulkDeleteCommandBuilder(this, entityCollection).delete();
    }

    /**
     * Batch deletes an entity collection.
     * 
     * @returns {Promise<void>} Batch delete promise.
     */
    public batchDelete(): Promise<void>
    {
        return new BrowseCommandBuilder(this).delete();
    }
}
