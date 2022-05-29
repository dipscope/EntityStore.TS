import { BulkAddCommandBuilder, EntityCollection } from '../../src';
import { SpecEntityStore, User } from '../entity-store.spec';

describe('Bulk add command builder', () =>
{
    it('should build bulk add command', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection<User>([userX, userY]);
        const bulkAddCommandBuilder = new BulkAddCommandBuilder(userSet, entityCollection);
        const bulkAddCommand = bulkAddCommandBuilder.build();

        expect(bulkAddCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(bulkAddCommand.entityCollection).toBe(entityCollection);
        expect(bulkAddCommand.entityCollection.at(0)).toBe(userX);
        expect(bulkAddCommand.entityCollection.at(1)).toBe(userY);
    });

    it('should attach entity collection', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollectionX = new EntityCollection<User>([userX, userY]);
        const bulkAddCommandBuilder = new BulkAddCommandBuilder(userSet, entityCollectionX);
        const entityCollectionY = new EntityCollection<User>([userY, userX]);
        const bulkAddCommand = bulkAddCommandBuilder.attach(entityCollectionY).build();

        expect(bulkAddCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(bulkAddCommand.entityCollection).toBe(entityCollectionY);
        expect(bulkAddCommand.entityCollection.at(0)).toBe(userY);
        expect(bulkAddCommand.entityCollection.at(1)).toBe(userX);
    });
});
