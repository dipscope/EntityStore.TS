import { BulkUpdateCommandBuilder, EntityCollection } from '../../src';
import { SpecEntityStore, User } from '../entity-store.spec';

describe('Bulk update command builder', () =>
{
    it('should build bulk update command', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollection = new EntityCollection<User>([userX, userY]);
        const bulkUpdateCommandBuilder = new BulkUpdateCommandBuilder(userSet, entityCollection);
        const bulkUpdateCommand = bulkUpdateCommandBuilder.build();

        expect(bulkUpdateCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(bulkUpdateCommand.entityCollection).toBe(entityCollection);
        expect(bulkUpdateCommand.entityCollection.at(0)).toBe(userX);
        expect(bulkUpdateCommand.entityCollection.at(1)).toBe(userY);
    });

    it('should attach entity collection', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const userX = new User('Dmitry');
        const userY = new User('Alex');
        const entityCollectionX = new EntityCollection<User>([userX, userY]);
        const bulkUpdateCommandBuilder = new BulkUpdateCommandBuilder(userSet, entityCollectionX);
        const entityCollectionY = new EntityCollection<User>([userY, userX]);
        const bulkUpdateCommand = bulkUpdateCommandBuilder.attach(entityCollectionY).build();

        expect(bulkUpdateCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(bulkUpdateCommand.entityCollection).toBe(entityCollectionY);
        expect(bulkUpdateCommand.entityCollection.at(0)).toBe(userY);
        expect(bulkUpdateCommand.entityCollection.at(1)).toBe(userX);
    });
});
