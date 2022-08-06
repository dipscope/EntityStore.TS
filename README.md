# EntityStore.TS

![GitHub](https://img.shields.io/github/license/dipscope/EntityStore.TS) ![NPM](https://img.shields.io/npm/v/@dipscope/entity-store) ![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)

`EntityStore.TS` is an abstraction layer for `TypeScript` to work with any kind of backend API or other datasource through the model reflection. It's pretty like `ORM` but depending from the `EntityProvider` it can work either in the browser or server. It supports [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) or declarative configuration and aims to simplify reflection, saving, filtering, sorting and pagination when dealing with entity mapping.

We recommend to use our [official website](https://dipscope.com/entity-store/what-issues-it-solves) to navigate through available features. You can also use the latest documentation described below.

## Give a star :star:

If you like or are using this project please give it a star. Thanks!

## Table of contents

* [What issues it solves?](#what-issues-it-solves)
* [Installation](#installation)
* [How it works?](#how-it-works)
* [Creating entity store](#creating-entity-store)
* [Adding entities](#adding-entities)
* [Querying entities](#querying-entities)
* [Updating entities](#updating-entities)
* [Saving entities](#saving-entities)
* [Removing entities](#removing-entities)
* [Filter entities](#filter-entities)
    * [Equals filter](#equals-filter)
    * [Not equals filter](#not-equals-filter)
    * [Contains filter](#contains-filter)
    * [Not contains filter](#not-contains-filter)
    * [Starts with filter](#starts-with-filter)
    * [Not starts with filter](#not-starts-with-filter)
    * [Ends with filter](#ends-with-filter)
    * [Not ends with filter](#not-ends-with-filter)
    * [In filter](#in-filter)
    * [Not in filter](#not-in-filter)
    * [Greater filter](#greater-filter)
    * [Greater than or equals filter](#greater-than-or-equals-filter)
    * [Lower filter](#lower-filter)
    * [Lower than or equals filter](#lower-than-or-equals-filter)
    * [And filter](#and-filter)
    * [Or filter](#or-filter)
* [Sort entities](#sort-entities)
* [Paginate entities](#paginate-entities)
* [Including entities](#including-entities)
* [Available entity providers](#available-entity-providers)
* [Implementing entity provider](#implementing-entity-provider)
* [Versioning](#versioning)
* [Contributing](#contributing)
* [Authors](#authors)
* [Notes](#notes)
* [License](#license)

## What issues it solves?

Each time starting a new project you may find your self implementing similar CRUD operations for backend API over and over again. Sometimes it may be an external service you have to deal with. It worth consider using `EntityStore.TS` if you: 

* Convert JSON or any other entity representation returned from backend API into model classes and vice versa;
* Perform property type conversions as for example ISO strings into a Date representation;
* Use DI services or constructor injections inside your entities;
* Use different approaches for filtering, sorting and pagination;
* Use built in `TypeScript` decorators to perform entity property mapping;

`EntityStore.TS` aims to abstract common operations into one universal interface you can reuse while building frontend and backend applications. This interface provides you reflection, filtering, sorting and pagination mechanics based on you application entities. Let's assume we have to query users JSON data from backend API and have a `User` class defined somewhere in our application.

```typescript
export class User
{
    public id?: string;
    public name: string;
    public deletedAt?: Date;

    // Omitted for brevity ...
}
```

By using `EntityStore.TS` you may encapsulate CRUD operations related to `User` class into it's own layer by convention called `EntityProvider` and use `EntityStore.TS` methods to perform certain actions in one generic way within whole application.

```typescript
import { AppEntityStore } from './app';
import { User } from './app/entities';

// Create entity provider.
const entityProvider = ...; 

// Create application entity store.
const appEntityStore = new AppEntityStore(entityProvider);

// Get user set.
const userSet = appEntityStore.userSet;

// Reflect user type.
const userMetadata = userSet.typeMetadata;

// Reflect user properties.
for (const propertyMetadata of userMetadata.propertyMetadataMap.values())
{
    const propertyName = propertyMetadata.propertyName;
    const defaultValue = propertyMetadata.defaultValue;

    // Do something with other data...
}

// Add users.
const addedUser = await userSet.add(new User('Dmitry'));
const addedUsers = await userSet.bulkAdd([new User('Dmitry'), new User('Alex')]);

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.eq(u.name, 'Victor')).findAll();
const filteredUsers = await userSet.filter((u, f) => f.in(u.name, ['Victor', 'Roman'])).findAll();

// Sort users.
const sortedUsers = await userSet.sortByAsc(e => e.name).findAll();
const sortedUsers = await userSet.sortByDesc(e => e.name).findAll();

// Paginate users.
const paginatedUsers = userSet.paginate(p => p.offsetLimit(10, 20)).findAll();
const paginatedUsers = userSet.paginate(p => p.limit(20)).findAll();

// Other actions ...
```

`EntityProvider` receives generated commands each time you finish method chaining. Such commands contain all required information to perform low level logic like sending HTTP request or serializing entity to JSON. Result of execution depends from a command but usually you will get fully qualified `User` class entities in return.

For fast start with `EntityStore` choose one of [available entity providers](#available-entity-providers). If you are using custom backend implementation you have to [implement such provider on you own](#implementing-entity-provider). 

Want to know more? Let's dive into the details.

## Installation

`EntityStore.TS` is available from NPM, both for browser (e.g. using webpack) and NodeJS:

```
npm i @dipscope/entity-store
```

TypeScript needs to run with the `experimentalDecorators` and `emitDecoratorMetadata` options enabled when using decorator annotations. So make sure you have properly configured your `tsconfig.json` file.

_This package depends from our `TypeManager.TS` package. Please [read documentation](https://github.com/dipscope/TypeManager.TS) after installation._

## How it works?

The core of `EntityStore.TS` is our `TypeManager.TS` package. It provides serialization and reflection support we use to travers entity properties and relations, build commands based on this information and many more. Please [read documentation](https://github.com/dipscope/TypeManager.TS) carefully before going further as we are not going to repeat this information here.

First off, we have to define our entity which we are going to save or query from a store. This can be achieved pretty easy using our [type manager](https://github.com/dipscope/TypeManager.TS). In our examples we are going to use decorator based annotation but you are free to use declarative style if required.

```typescript
import { Type, Property } from '@dipscope/type-manager';
import { EntityCollection } from '@dipscope/entity-store';
import { Company, Message } from './app/entities';

@Type()
export class User
{
    @Property(String) public id?: string;
    @Property(String) public name: string;
    @Property(String) public email: string;
    @Property(Company) public company: Company;
    @Property(EntityCollection, [Message]) public messages: EntityCollection<Message>;

    // Omitted for brevity ...
}
```

As you may already know from `TypeManager.TS` [documentation](https://github.com/dipscope/TypeManager.TS) such definition will register metadata for a `User` entity. This metadata will be later used by `EntityStore` for building commands. The next step is to define our store with so called entity sets attached to a properties. `EntityStore` is a collection of all available entities within a module while `EntitySet` acts as an entry point to perform operations over one concrete entity.

```typescript
import { Type } from '@dipscope/type-manager';
import { EntitySet, EntityStore, EntityProvider } from '@dipscope/entity-store';
import { User } from './app/entities';

@Type({
    injectable: true
})
export class AppEntityStore extends EntityStore
{
    // This property represents set of users.
    public readonly userSet: EntitySet<User>;
    
    // Constructor accepts an implementation of entity provider.
    public constructor(entityProvider: EntityProvider)
    {
        // We simply passing implementation to the parent constructor.
        super(entityProvider);

        // Create entity set for our user entity.
        this.userSet = this.createEntitySet(User);

        return;
    }
}
```

Our `EntityStore` accepts an implementation of `EntityProvider` interface which acts as transaction layer with backend service. We simply pass it to the parent constructor.

To create an `EntitySet` we have to call a special method and pass our entity. In our case this is a `User` class. Internally this method extracts a metadata defined using `TypeManager` to enable reflection abilities. When we call any method provided by `EntitySet` which access model properties we are actually traversing metadata tree and not real property values.

```typescript
import { AppEntityStore } from './app';

// Create entity provider.
const entityProvider = ...; 

// Create application entity store and access user set.
const appEntityStore = new AppEntityStore(entityProvider);
const userSet = appEntityStore.userSet;

// Such calls actually visits defined metadata tree.
const filteredUsers = await userSet.filter((u, f) => f.eq(u.name, 'Victor')).findAll();
const filteredUsers = await userSet.filter((u, f) => f.in(u.name, ['Victor', 'Roman'])).findAll();
```

When we finished method chaining and defined desired expression - reflected information is transformed into a command which is sent to `EntityProvider`. `EntityProvider` is responsible for proper handling of the command and return result as defined in the interface.

Basically that's it. Your requests are transferred through the `EntitySet` to the `EntityProvider` which handles all tricky points it can handle using generated command with all related data.

Now let's go through each part individually. Note that some methods may not be supported by certain `EntityProvider`. It depends from underlying service and execution of some commands may be restricted. Returned result also dependent from `EntityProvider` implementation.

## Creating entity store

In the most basic cases you may use `EntityStore` provided by the library to create required `EntitySet` for your entities.

```typescript
import { EntityStore } from '@dipscope/entity-store';
import { User } from './app/entities';

// Create entity provider.
const entityProvider = ...; 

// Create entity store.
const entityStore = new EntityStore(entityProvider);

// Create user set.
const userSet = entityStore.createEntitySet(User);
```

However it is much more useful to extend base class and collect all module related entities into one `EntityStore`. If you are using a framework like `Angular` this class may also be registered as injectable service to be used within application.

```typescript
import { Injectable } from '@angular/core'
import { EntitySet, EntityStore, EntityProvider } from '@dipscope/entity-store';
import { User, Message } from './app/entities';

@Injectable()
export class AppEntityStore extends EntityStore
{
    public readonly userSet: EntitySet<User>;
    public readonly messageSet: EntitySet<Message>;
    
    public constructor(entityProvider: EntityProvider)
    {
        super(entityProvider);

        this.userSet = this.createEntitySet(User);
        this.messageSet = this.createEntitySet(Message);

        return;
    }
}
```

Somewhere in the application you may use it almost the same way as a base one.

```typescript
import { AppEntityStore } from './app';

// Create entity provider.
const entityProvider = ...; 

// Create entity store.
const appEntityStore = new AppEntityStore(entityProvider);

// Get user set.
const userSet = appEntityStore.userSet;
```

You have to use one of the [available entity providers](#available-entity-providers) or [implement your own](#implementing-entity-provider). Check proper sections for more info.

## Adding entities

Add one entity by calling `add` method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Create new user.
const name = 'Dmitry';
const user = new User(name);

// Add user to a set.
const addedUser = await userSet.add(user);
```

Add multiple entities by calling `bulkAdd` method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Create new users.
const nameX = 'Dmitry';
const userX = new User(name);

const nameY = 'Alex';
const userY = new User(name);

// Add users to a set.
const addedUsers = await userSet.bulkAdd([userX, userY]);
```

## Querying entities

Query one entity by calling `find` or `findOne` method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Find user by key values.
const userId = ...;
const userById = await userSet.find(userId);

// Find first user.
const firstUser = await userSet.findOne();
```

Query multiple entities by calling `findAll` method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Find all users
const allUsers = await userSet.findAll();
```

## Updating entities

Update one entity by calling `update` method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Get user by name.
const user = userSet.filter((u, f) => f.eq(u.name, 'Dmitry')).findOne();

// Set new email.
user.email = 'dmitry@mail.com';

// Update user.
const updatedUser = await userSet.update(user);
```

Update multiple entities by calling `bulkUpdate` method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Get users by name.
const userX = userSet.filter((u, f) => f.eq(u.name, 'Dmitry')).findOne();
const userY = userSet.filter((u, f) => f.eq(u.name, 'Alex')).findOne();

// Set new email.
userX.email = 'dmitry@mail.com';
userY.email = 'alex@mail.com';

// Update users.
const updatedUsers = await userSet.bulkUpdate([userX, userY]);
```

Update entities without loading them by calling `batchUpdate` method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Update all users.
await userSet.batchUpdate({ email: 'user@mail.com' });

// Update certain users.
await userSet.filter((u, f) => f.in(u.name, ['Dmitry', 'Alex'])).update({ email: 'user@mail.com' });
```

## Saving entities

Add or update one entity by calling `save` method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Create new user.
const name = 'Dmitry';
const user = new User(name);

// Add or update user in set.
const savedUser = await userSet.save(user);
```

Add or update multiple entities by calling `bulkSave` method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Create new user.
const nameX = 'Dmitry';
const userX = new User(name);

// Get user by name.
const userY = userSet.filter((u, f) => f.eq(u.name, 'Alex')).findOne();

// Set new email.
userX.email = 'dmitry@mail.com';
userY.email = 'alex@mail.com';

// Save users in a set.
const savedUsers = await userSet.bulkSave([userX, userY]);
```

## Removing entities

Remove one entity by calling `remove` method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Get user by name.
const user = userSet.filter((u, f) => f.eq(u.name, 'Dmitry')).findOne();

// Remove user from a set.
const removedUser = await userSet.remove(user);
```

Remove multiple entities by calling `bulkRemove` method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Get users by name.
const userX = userSet.filter((u, f) => f.eq(u.name, 'Dmitry')).findOne();
const userY = userSet.filter((u, f) => f.eq(u.name, 'Alex')).findOne();

// Remove users from a set.
const removedUsers = await userSet.bulkRemove([userX, userY]);
```

Remove entities without loading them by calling `batchRemove` method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Remove all users.
await userSet.batchRemove();

// Remove certain users.
await userSet.filter((u, f) => f.in(u.name, ['Dmitry', 'Alex'])).remove();
```

## Filter entities

Each created `EntitySet` may be filtered by calling `filter` method. It expects a delegate with 2 arguments. The first one is an entity for which set was created. We have to use it for traversing metadata tree and specify properties we want to filter. The second one is a filter expression builder. We have to use it for specifying a filter expression we are going to apply for a property. Note that filtering support is dependent from `EntityProvider`.

### Equals filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.eq(u.name, 'Dmitry')).findAll();
```

### Not equals filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.notEq(u.name, 'Dmitry')).findAll();
```

### Contains filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.contains(u.name, 'Dmit')).findAll();
```

### Not contains filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.notContains(u.name, 'Dmit')).findAll();
```

### Starts with filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.startsWith(u.name, 'Dmit')).findAll();
```

### Not starts with filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.notStartsWith(u.name, 'Dmit')).findAll();
```

### Ends with filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.endsWith(u.name, 'try')).findAll();
```

### Not ends with filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.notEndsWith(u.name, 'try')).findAll();
```

### In filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.in(u.name, ['Dmitry', 'Alex'])).findAll();
```

### Not in filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.notIn(u.name, ['Dmitry', 'Alex'])).findAll();
```

### Greater filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.gt(u.position, 100)).findAll();
```

### Greater than or equals filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.gte(u.position, 100)).findAll();
```

### Lower filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.lt(u.position, 100)).findAll();
```

### Lower than or equals filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.lte(u.position, 100)).findAll();
```

### And filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.and(f.lte(u.position, 100), f.eq(u.name, 'Dmitry'))).findAll();
```

### Or filter

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Filter users.
const filteredUsers = await userSet.filter((u, f) => f.or(f.lte(u.position, 100), f.eq(u.name, 'Dmitry'))).findAll();
```

## Sort entities

Sort entities by calling `sortByAsc` and `sortByDesc` methods on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Sort users.
const sortedUsers = await userSet.sortByAsc(u => u.name).thenSortByDesc(u => u.position).findAll();
const sortedUsers = await userSet.sortByDesc(u => u.name).thenSortByAsc(u => u.position).findAll();
```

## Paginate entities

Paginate entities by calling `paginate` method on `EntitySet` and providing desired pagination strategy. Note that `EntityProvider` may support only certain set of pagination strategies.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Paginate users using offset based strategy.
const paginatedUsers = await userSet.paginate(p => p.offsetLimit(20, 10)).findAll();
const paginatedUsers = await userSet.paginate(p => p.offset(20)).findAll();
const paginatedUsers = await userSet.paginate(p => p.limit(10)).findAll();

// Paginate users using page based strategy.
const paginatedUsers = await userSet.paginate(p => p.pageSize(2, 20)).findAll();
const paginatedUsers = await userSet.paginate(p => p.page(2)).findAll();
const paginatedUsers = await userSet.paginate(p => p.size(20)).findAll();

// Paginate users using cursor based strategy.
const paginatedUsers = await userSet.paginate(p => p.take(20)).findAll();
const paginatedUsers = await userSet.paginate(p => p.takeAfterCursor(20, afterCursor)).findAll();
const paginatedUsers = await userSet.paginate(p => p.takeBeforeCursor(20, beforeCursor)).findAll();
const paginatedUsers = await userSet.paginate(p => p.takeBetweenCursors(afterCursor, beforeCursor)).findAll();
```

## Including entities

If you are sending data over the network then some entity relations might require explicit loading. We provide methods for that case which certain `EntityProvider` may support.

Include entities by calling `include` or `includeCollection` methods on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get user set.
const userSet = appEntityStore.userSet;

// Include user relations.
const users = await userSet.include(u => u.company).includeCollection(u => u.messages).findAll();
```

## Available entity providers

There is currently `InMemory` entity provider [available](https://github.com/dipscope/InMemoryEntityProvider.TS). It will perfectly fit for development state to avoid using real backend until you really need one. Also it's a good choice if you want to try things out and see how entity store is actually works.

Another provider you can use is `JsonApi` [entity provider](https://github.com/dipscope/JsonApiEntityProvider.TS). It covers [JSON:API](https://jsonapi.org) specification and allows you to use `EntityStore` with any backend which follows shared conventions.

We are going to update this section when there will be more providers. Besides we are looking for contributors to help us with this topic. If you find our project interesting don't hesitate to contact us.

## Implementing entity provider

If you have custom backend service and want to work on a high level when it comes to reflection, filtering, sorting and pagination of available entities then `EntityStore.TS` is a perfect choice but you have to implement an `EntityProvider` which actually connects `EntityStore` with your backend service. `EntityProvider` is responsible for handling generated commands which contain all required information. In this section we are going to describe this interface in general and how you can use generated commands to perform low level logic. Here how this interface looks like.

```typescript
// Interface which implements each custom entity provider.
export interface EntityProvider
{
    // This method is called when entity should be added.
    executeAddCommand<TEntity extends Entity>(addCommand: AddCommand<TEntity>): Promise<TEntity>;

    // This method is called when multiple entities should be added.
    executeBulkAddCommand<TEntity extends Entity>(bulkAddCommand: BulkAddCommand<TEntity>): Promise<EntityCollection<TEntity>>;

    // This method is called when entity should be updated.
    executeUpdateCommand<TEntity extends Entity>(updateCommand: UpdateCommand<TEntity>): Promise<TEntity>;

    // This method is called when multiple entities should be updated.
    executeBulkUpdateCommand<TEntity extends Entity>(bulkUpdateCommand: BulkUpdateCommand<TEntity>): Promise<EntityCollection<TEntity>>;

    // Omitted for brevity ...
}
```

Each command corresponds to a method defined in the `EntitySet` and on this level you have to transform it into propper statements for your backend service. This statements will differ for each provider and the most proper way to see the difference is to browse the source code of our [available entity providers](#available-entity-providers). Depending from a command you will get a concrete set of data you have to handle.

```typescript
// Add command extends base command which contains entity info about concrete entity.
export class AddCommand<TEntity extends Entity> extends Command<TEntity, TEntity>
{
    // Entity which should be added.
    public readonly entity: TEntity;

    // Entity info and entity are passed by entity set when we finish method chaining.
    // In our case when we called userSet.add(user) method.
    public constructor(entityInfo: EntityInfo<TEntity>, entity: TEntity)
    {
        super(entityInfo);

        this.entity = entity;

        return;
    }

    // Omitted for brevity ...
}
```

When handling `AddCommand` we may browse available properties through `EntityInfo` and extract or serialize them for the actual entity. All commands structured the same way but contain different set of data. Currently it is not clear which parts we have to describe. Feel free to open an issue if you require more information.

## Versioning

We use [SemVer](http://semver.org) for versioning. For the versions available, see the versions section on [NPM project page](https://www.npmjs.com/package/@dipscope/entity-store).

See information about breaking changes, release notes and migration steps between versions in [CHANGELOG.md](https://github.com/dipscope/EntityStore.TS/blob/main/CHANGELOG.md) file.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/dipscope/EntityStore.TS/blob/main/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Dmitry Pimonov** - *Initial work* - [dpimonov](https://github.com/dpimonov)

See also the list of [contributors](https://github.com/dipscope/EntityStore.TS/contributors) who participated in this project.

## Notes

Thanks for checking this package.

Feel free to create an issue if you find any mistakes in documentation or have any improvements in mind.

We wish you good luck and happy coding!

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](https://github.com/dipscope/EntityStore.TS/blob/main/LICENSE.md) file for details.
