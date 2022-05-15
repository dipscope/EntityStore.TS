import { Property, Type } from '@dipscope/type-manager';

import { EntitySet, EntityStore } from '../src';
import { InMemoryEntityProvider } from '../src/entity-providers/in-memory';

@Type()
export class User
{
    @Property(String) public name?: string;
    @Property(String) public email?: string;
}

@Type()
export class Message
{
    @Property(String) public title?: string;
    @Property(Number) public priority?: number;
}

export class SpecEntityStore extends EntityStore
{
    public readonly users: EntitySet<User>;
    public readonly messages: EntitySet<Message>;

    public constructor()
    {
        super(new InMemoryEntityProvider());

        this.users = this.createEntitySet(User);
        this.messages = this.createEntitySet(Message);
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
