import { Inject, Injectable, Property, Type } from '@dipscope/type-manager';

import { EntityCollection, EntitySet, EntityStore } from '../src';
import { InMemoryEntityProvider } from '../src/entity-providers/in-memory';

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
    @Property(EntityCollection, [Message]) public messages: EntityCollection<Message>;

    public constructor(@Inject('name') name: string)
    {
        this.name = name;
        this.messages = new EntityCollection<Message>();

        return;
    }
}

@Injectable()
export class SpecEntityStore extends EntityStore
{
    public readonly messages: EntitySet<Message>;
    public readonly users: EntitySet<User>;
    
    public constructor()
    {
        super(new InMemoryEntityProvider());

        this.messages = this.createEntitySet(Message);
        this.users = this.createEntitySet(User);
    }
}

describe('Entity store', () =>
{
    it('should allow creation of entity sets', () =>
    {
        const entityProvider = new InMemoryEntityProvider();
        const entityStore = new EntityStore(entityProvider);
        const users = entityStore.createEntitySet(User);
        const messages = entityStore.createEntitySet(Message);
        
        expect(users).toBeInstanceOf(EntitySet);
        expect(messages).toBeInstanceOf(EntitySet);
    });

    it('should be open for extensions', () =>
    {
        const specEntityStore = new SpecEntityStore();
        
        expect(specEntityStore.users).toBeInstanceOf(EntitySet);
        expect(specEntityStore.messages).toBeInstanceOf(EntitySet);
    });
});
