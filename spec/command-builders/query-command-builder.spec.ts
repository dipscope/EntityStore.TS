import { QueryCommandBuilder } from '../../src';
import { SpecEntityStore, User } from '../entity-store.spec';

describe('Query command builder', () =>
{
    it('should build query command', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const keyValues = [1];
        const queryCommandBuilder = new QueryCommandBuilder(userSet, keyValues);
        const queryCommand = queryCommandBuilder.build();

        expect(queryCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(queryCommand.keyValues).toBe(keyValues);
    });

    it('should set key values', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const keyValuesX = [1];
        const queryCommandBuilder = new QueryCommandBuilder(userSet, keyValuesX);
        const keyValuesY = [2];
        const queryCommand = queryCommandBuilder.attach(keyValuesY).build();

        expect(queryCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(queryCommand.keyValues).toBe(keyValuesY);
    });
});
