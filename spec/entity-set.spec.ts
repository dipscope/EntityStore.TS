import { SpecEntityStore, User } from './entity-store.spec';

describe('Entity set', () =>
{
    it('should add new entities', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const user = new User('Dmitry');
        const addedUser = await users.add(user);
        const foundUser = await users.where((u, fe) => fe.eq(u.name, 'Dmitry')).findOne();

        expect(addedUser).not.toBeNull();
        expect(foundUser).not.toBeNull();
    });
    
    it('should update existing entities', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const user = new User('Dmitry');
        const addedUser = await users.add(user);

        expect(addedUser).not.toBeNull();

        user.name = 'Alex';

        const updatedUser = await users.update(user);
        const foundUser = await users.where((u, fe) => fe.eq(u.name, 'Alex')).findOne();

        expect(updatedUser).not.toBeNull();
        expect(foundUser).not.toBeNull();
    });

    it('should save new entities', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const user = new User('Dmitry');
        const addedUser = await users.save(user);
        const foundAddedUser = await users.where((u, fe) => fe.eq(u.name, 'Dmitry')).findOne();

        expect(addedUser).not.toBeNull();
        expect(foundAddedUser).not.toBeNull();

        user.name = 'Alex';

        const updatedUser = await users.save(user);
        const foundUpdatedUser = await users.where((u, fe) => fe.eq(u.name, 'Alex')).findOne();

        expect(updatedUser).not.toBeNull();
        expect(foundUpdatedUser).not.toBeNull();
    });

    it('should remove existing entities', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const user = new User('Dmitry');
        const addedUser = await users.add(user);

        expect(addedUser).not.toBeNull();

        const removedUser = await users.remove(user);
        const foundUser = await users.where((u, fe) => fe.eq(u.name, 'Dmitry')).findOne();

        expect(removedUser).not.toBeNull();
        expect(foundUser).toBeNull();
    });

    it('should bulk add new entities', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const addedUsers = await users.bulkAdd([userX, userY]);
        const foundUsers = await users.where((u, fe) => fe.in(u.name, ['Dmitry', 'Alex'])).findAll();

        expect(addedUsers.length).toBe(2);
        expect(foundUsers.length).toBe(2);
    });

    it('should bulk update existing entities', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const addedUsers = await users.bulkAdd([userX, userY]);

        expect(addedUsers.length).toBe(2);

        userX.name = 'Victor';
        userY.name = 'Roman';

        const updatedUsers = await users.bulkUpdate([userX, userY]);
        const foundUsers = await users.where((u, fe) => fe.in(u.name, ['Victor', 'Roman'])).findAll();

        expect(updatedUsers.length).toBe(2);
        expect(foundUsers.length).toBe(2);
    });

    it('should bulk save new entities', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const addedUsers = await users.bulkSave([userX, userY]);
        const foundAddedUsers = await users.where((u, fe) => fe.in(u.name, ['Dmitry', 'Alex'])).findAll();

        expect(addedUsers.length).toBe(2);
        expect(foundAddedUsers.length).toBe(2);

        userX.name = 'Victor';
        userY.name = 'Roman';

        const updatedUsers = await users.bulkUpdate([userX, userY]);
        const foundUpdatedUsers = await users.where((u, fe) => fe.in(u.name, ['Victor', 'Roman'])).findAll();

        expect(updatedUsers.length).toBe(2);
        expect(foundUpdatedUsers.length).toBe(2);
    });

    it('should batch update existing entities', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const addedUsers = await users.bulkAdd([userX, userY]);

        expect(addedUsers.length).toBe(2);

        await users.where((u, fe) => fe.in(u.name, ['Dmitry', 'Alex'])).update({ name: 'Victor' });

        const updatedUsers = await users.where((u, fe) => fe.eq(u.name, 'Victor')).findAll();

        expect(updatedUsers.length).toBe(2);
    });

    it('should bulk remove existing entities', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const addedUsers = await users.bulkAdd([userX, userY]);

        expect(addedUsers.length).toBe(2);

        const removedUsers = await users.bulkRemove([userX, userY]);
        const foundUsers = await users.where((u, fe) => fe.in(u.name, ['Dmitry', 'Alex'])).findAll();

        expect(removedUsers.length).toBe(2);
        expect(foundUsers.length).toBe(0);
    });

    it('should batch remove existing entities', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const addedUsers = await users.bulkAdd([userX, userY]);

        expect(addedUsers.length).toBe(2);

        await users.where((u, fe) => fe.in(u.name, ['Dmitry', 'Alex'])).remove();

        const foundUsers = await users.where((u, fe) => fe.in(u.name, ['Dmitry', 'Alex'])).findAll();

        expect(foundUsers.length).toBe(0);
    });

    it('should sort existing entities in ascending order', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const addedUsers = await users.bulkAdd([userX, userY]);

        expect(addedUsers.length).toBe(2);

        const sortedUsers = await users.sortByAsc(e => e.name).findAll();

        expect(sortedUsers.at(0)?.name).toBe('Alex');
        expect(sortedUsers.at(1)?.name).toBe('Dmitry');
    });

    it('should sort existing entities in descending order', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const addedUsers = await users.bulkAdd([userX, userY]);

        expect(addedUsers.length).toBe(2);

        const sortedUsers = await users.sortByDesc(e => e.name).findAll();

        expect(sortedUsers.at(0)?.name).toBe('Dmitry');
        expect(sortedUsers.at(1)?.name).toBe('Alex');
    });

    it('should filter existing entities', async () =>
    {
        const specEntityStore = new SpecEntityStore();
        const users = specEntityStore.users;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const userZ = new User('Victor');
        const addedUsers = await users.bulkAdd([userX, userY, userZ]);

        expect(addedUsers.length).toBe(3);

        const filteredUsers = await users.where((u, fe) => fe.eq(u.name, 'Alex')).findAll();

        expect(filteredUsers.length).toBe(1);
        expect(filteredUsers.first()).toBe(userY);
    });
});
