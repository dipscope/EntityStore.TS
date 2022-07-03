import { Inject, Property, Type } from '@dipscope/type-manager';
import { AddCommand, BatchRemoveCommand, BatchUpdateCommand, BulkAddCommand, BulkQueryCommand, BulkRemoveCommand, BulkSaveCommand } from '../src';
import { BulkUpdateCommand, Entity, EntityCollection, EntityProvider } from '../src';
import { EntitySet, EntityStore, Nullable, QueryCommand, RemoveCommand, SaveCommand, UpdateCommand } from '../src';

@Type()
export class Message
{
    @Property(String) public title: string;
    @Property(Number) public priority: number;

    public constructor(@Inject('title') title: string, @Inject('priority') priority: number)
    {
        this.title = title;
        this.priority = priority;

        return;
    }
}

@Type()
export class User
{
    @Property(String) public name: string;
    @Property(EntityCollection, [Message]) public messages?: EntityCollection<Message>;

    public constructor(@Inject('name') name: string, @Inject('messages') messages?: EntityCollection<Message>)
    {
        this.name = name;
        this.messages = messages;

        return;
    }
}

@Type({
    injectable: true
})
export class DummyEntityProvider implements EntityProvider
{
    public async executeAddCommand<TEntity extends Entity>(addCommand: AddCommand<TEntity>): Promise<TEntity>
    {
        throw new Error(addCommand.entityInfo.typeMetadata.typeName);
    }
    
    public async executeBulkAddCommand<TEntity extends Entity>(bulkAddCommand: BulkAddCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        throw new Error(bulkAddCommand.entityInfo.typeMetadata.typeName);
    }
    
    public async executeUpdateCommand<TEntity extends Entity>(updateCommand: UpdateCommand<TEntity>): Promise<TEntity>
    {
        throw new Error(updateCommand.entityInfo.typeMetadata.typeName);
    }

    public async executeBulkUpdateCommand<TEntity extends Entity>(bulkUpdateCommand: BulkUpdateCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        throw new Error(bulkUpdateCommand.entityInfo.typeMetadata.typeName);
    }

    public async executeBatchUpdateCommand<TEntity extends Entity>(batchUpdateCommand: BatchUpdateCommand<TEntity>): Promise<void>
    {
        throw new Error(batchUpdateCommand.entityInfo.typeMetadata.typeName);
    }
    
    public async executeSaveCommand<TEntity extends Entity>(saveCommand: SaveCommand<TEntity>): Promise<TEntity>
    {
        throw new Error(saveCommand.entityInfo.typeMetadata.typeName);
    }
    
    public async executeBulkSaveCommand<TEntity extends Entity>(bulkSaveCommand: BulkSaveCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        throw new Error(bulkSaveCommand.entityInfo.typeMetadata.typeName);
    }
    
    public async executeQueryCommand<TEntity extends Entity>(queryCommand: QueryCommand<TEntity>): Promise<Nullable<TEntity>>
    {
        throw new Error(queryCommand.entityInfo.typeMetadata.typeName);
    }
    
    public async executeBulkQueryCommand<TEntity extends Entity>(bulkQueryCommand: BulkQueryCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        throw new Error(bulkQueryCommand.entityInfo.typeMetadata.typeName);
    }

    public async executeRemoveCommand<TEntity extends Entity>(removeCommand: RemoveCommand<TEntity>): Promise<TEntity>
    {
        throw new Error(removeCommand.entityInfo.typeMetadata.typeName);
    }

    public async executeBulkRemoveCommand<TEntity extends Entity>(bulkRemoveCommand: BulkRemoveCommand<TEntity>): Promise<EntityCollection<TEntity>>
    {
        throw new Error(bulkRemoveCommand.entityInfo.typeMetadata.typeName);
    }

    public async executeBatchRemoveCommand<TEntity extends Entity>(batchRemoveCommand: BatchRemoveCommand<TEntity>): Promise<void>
    {
        throw new Error(batchRemoveCommand.entityInfo.typeMetadata.typeName);
    }
}

@Type({
    injectable: true
})
export class SpecEntityStore extends EntityStore
{
    public readonly messageSet: EntitySet<Message>;
    public readonly userSet: EntitySet<User>;
    
    public constructor()
    {
        super(new DummyEntityProvider());

        this.messageSet = this.createEntitySet(Message);
        this.userSet = this.createEntitySet(User);

        return;
    }
}

describe('Entity store', () =>
{
    it('should allow creation of entity sets', () =>
    {
        const entityProvider = new DummyEntityProvider();
        const entityStore = new EntityStore(entityProvider);
        const userSet = entityStore.createEntitySet(User);
        const messageSet = entityStore.createEntitySet(Message);
        
        expect(userSet).toBeInstanceOf(EntitySet);
        expect(messageSet).toBeInstanceOf(EntitySet);
    });

    it('should be open for extensions', () =>
    {
        const specEntityStore = new SpecEntityStore();
        
        expect(specEntityStore.userSet).toBeInstanceOf(EntitySet);
        expect(specEntityStore.messageSet).toBeInstanceOf(EntitySet);
    });
});
