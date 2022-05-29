import { AscSortExpression, BrowseCommandBuilder, EqFilterExpression, PaginateExpression } from '../../src';
import { SpecEntityStore, User } from '../entity-store.spec';

describe('Browse command builder', () =>
{
    it('should build bulk query command', () =>
    {
        const specEntityStore = new SpecEntityStore();
        const userSet = specEntityStore.userSet;
        const browseCommandBuilder = new BrowseCommandBuilder(userSet);

        browseCommandBuilder.where((u, f) => f.eq(u.name, 'Dmitry')).sortByAsc(u => u.name).skip(10).take(2);

        const bulkQueryCommand = browseCommandBuilder.build();

        expect(bulkQueryCommand.entityInfo.typeMetadata.typeFn).toBe(User);
        expect(bulkQueryCommand.filterExpression).toBeInstanceOf(EqFilterExpression);
        expect(bulkQueryCommand.sortExpression).toBeInstanceOf(AscSortExpression);
        expect(bulkQueryCommand.paginateExpression).toBeInstanceOf(PaginateExpression);
    });
});
