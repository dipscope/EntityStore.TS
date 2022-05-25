# EntityStore.TS

<!-- ![GitHub](https://img.shields.io/github/license/dipscope/EntityStore.TS) ![NPM](https://img.shields.io/npm/v/@dipscope/entity-store) ![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg) -->

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
* [Query entities](#query-entities)
* [Updating entities](#updating-entities)
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
    * [Asc sort](#asc-sort)
    * [Desc sort](#desc-sort)
* [Paginate entities](#paginate-entities)
    * [Skip](#skip)
    * [Take](#take)
* [Available entity providers](#available-entity-providers)
    * [InMemory](#inmemory)
    * [JsonApi](#jsonapi)
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

    public constructor(name: string)
    {
        this.name = name;

        return;
    }

    public isDeleted(): boolean
    {
        return this.deletedAt !== undefined;
    }
}
```

By using `EntityStore.TS` you may encapsulate CRUD operations related to `User` class into it's own layer by convention called `EntityProvider` and use `EntityStore.TS` methods to perform certain actions in one generic way within whole application.

```typescript
import { AppEntityStore } from './app';
import { User } from './app/entities';

// Create application entity store.
const appEntityStore = new AppEntityStore();

// Gets user entity set.
const users = appEntityStore.users;

// Reflect user type.
const userMetadata = users.typeMetadata;

// Reflect user properties.
for (const propertyMetadata of userMetadata.propertyMetadataMap.values())
{
    const propertyName = propertyMetadata.propertyName;
    const defaultValue = propertyMetadata.defaultValue;

    // Do something with other data...
}

// Add users.
const addedUser = await users.add(new User('Dmitry'));
const addedUsers = await users.bulkAdd([new User('Dmitry'), new User('Alex')]);

// Filter users.
const filteredUsers = await users.where((u, fe) => fe.eq(u.name, 'Victor')).findAll();
const filteredUsers = await users.where((u, fe) => fe.in(u.name, ['Victor', 'Roman'])).findAll();

// Sort users.
const sortedUsers = await users.sortByAsc(e => e.name).findAll();
const sortedUsers = await users.sortByDesc(e => e.name).findAll();

// Paginate users.
const paginatedUsers = users.skip(10).take(20).findAll();
const paginatedUsers = users.take(20).findAll();

// Other actions ...
```

`EntityProvider` receives generated commands each time you finish method chaining. Such commands contain all required information to perform low level logic like sending HTTP request or serializing entity to JSON. Result of execution depends from a command but usually you will get fully qualified `User` class entities in return.

We have already implemented several [entity providers](#available-entity-providers) like `InMemory` and `JsonApi` to help on your way. If you are using custom backend implementation you have to [implement such provider on you own](#implementing-entity-provider). 

Want to know more? Let's dive into the details.

## Installation

`EntityStore.TS` is available from NPM, both for browser (e.g. using webpack) and NodeJS:

```
npm i @dipscope/entity-store
```

TypeScript needs to run with the `experimentalDecorators` and `emitDecoratorMetadata` options enabled when using decorator annotations. So make sure you have properly configured your `tsconfig.json` file.

_This package depends from our `TypeManager.TS` package. Please [read documentation](https://github.com/dipscope/TypeManager.TS) after installation._

## How it works?

The core of `EntityStore.TS` is our `TypeManager.TS` package. It provides serialization and reflection abilities we use to travers model trees, build commands and many more. Please [read documentation](https://github.com/dipscope/TypeManager.TS) carefully before going further as we are not going to repeat this information here and start from entity store related information.

First off, we have to define out model which we are going to query from a store. This can be archived pretty easy using our [`TypeManager.TS`](https://github.com/dipscope/TypeManager.TS). In our examples we are going to use decarator based annotation but you are free to use declarative style if required.

```typescript
import { Type, Property } from '@dipscope/type-manager';

@Type()
export class User
{
    @Property(String) public id?: string;
    @Property(String) public name: string;
    @Property(String) public email: string;

    // Omitted for brevity ...
}
```

As you may already now from [`TypeManager.TS` documentation](https://github.com/dipscope/TypeManager.TS) such definition will register a `TypeMetadata` for a `User`. This metadata will be later used by `EntityStore` for building expressions. The next step is to define our store with so called entity sets attached to a properties. `EntityStore` is a collection of all available entities within application while `EntitySet` acts as an entry point to perform operations over one concrete `Entity`.

```typescript
import { Injectable } from '@dipscope/type-manager';
import { EntitySet, EntityStore } from '@dipscope/entity-store';
import { InMemoryEntityProvider } from '@dipscope/entity-store/entity-providers/in-memory';

@Injectable()
export class AppEntityStore extends EntityStore
{
    // This property represents set of users.
    public readonly users: EntitySet<User>;
    
    public constructor()
    {
        // We are going to use in memory entity provider.
        super(new InMemoryEntityProvider());

        // Create entity set for out user model.
        this.users = this.createEntitySet(User);

        return;
    }
}
```

For our example we registered entity store with `InMemory` entity provider to easily start implementing all CRUD operations available without actually dealing with real backend. We can switch to a certain provider like `JsonApi` later.

To create an `EntitySet` you have to call a method with passing model class for which you are going to create a set. In out case this is a `User` class. Internally it extract a metadata defined using `TypeManager` to enable reflection abilities. When you call any method provided by `EntitySet` which access model properties you are actually traverses metadata tree and not real property values.

```typescript
import { AppEntityStore } from './core';

// Create entity store and acess users entity set.
const appEntityStore = new AppEntityStore();
const users = appEntityStore.users;

// Such calls actually visits defined metadata tree.
const filteredUsers = await users.where((u, fe) => fe.eq(u.name, 'Victor')).findAll();
const filteredUsers = await users.where((u, fe) => fe.in(u.name, ['Victor', 'Roman'])).findAll();
```

When we finished method chaining and defined desired expression reflected information is transformed into a `Command` which is sent to `EntityProvider`. `EntityProvider` is responsible for proper handling of the command and returned result as defined in the interface. 

Basically that's it. Your requests are transfered through the `EntitySet` to the `EntityProvider` which handles all tricky points he can handle using generated `Command` with all related information. Currently we have already implemented `InMemory` and `JsonApi` entity providers. There will be more in the future. If you know any clear API specification this may be a good point to contribute.

Now let's go through each part individually.

## Creating entity store

In the most basic use cases you may use `EntityStore` provided by the library to create required `EntitySet`.

```typescript
import { EntityStore } from '@dipscope/entity-store';
import { User } from './app/models';

// Create entity provider.
const entityProvider = ...; 

// Create entity store.
const entityStore = new EntityStore(entityProvider);

// Create entity set.
const users = entityStore.createEntitySet(User);
```

However it is much more sufficient to extend base class and collect all module related entities into one `EntityStore`. If you are using a framework like `Angular` this class may also be registered as a service to use within application.

```typescript
import { Injectable } from '@angular/core'
import { EntitySet, EntityStore, EntityProvider } from '@dipscope/entity-store';
import { User, Message } from './app/entities';

@Injectable()
export class AppEntityStore extends EntityStore
{
    public readonly users: EntitySet<User>;
    public readonly messages: EntitySet<Message>;
    
    public constructor(entityProvider: EntityProvider)
    {
        super(entityProvider);

        this.users = this.createEntitySet(User);
        this.users = this.createEntitySet(Message);

        return;
    }
}
```

Somewhere in the application you may use it almost the same way as a base one.

```typescript
import { AppEntityStore } from './app';
import { User } from './app/entities';

// Create entity provider.
const entityProvider = ...; 

// Create entity store.
const entityStore = new AppEntityStore(entityProvider);

// Create entity set.
const users = entityStore.users;
```

You have to use one of the available entity providers or implement your own. Check proper sections for more info about how to setup available entity provider or implement your own.

## Adding entities

To add entities you have to get an `EntitySet` you want to use. Create new entities and call certain method.

You can add one `Entity` by calling add method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get entity set.
const users = entityStore.users;

// Create a new user.
const name = 'Dmitry';
const user = new User(name);

// Add user to an entity set.
const addedUser = await users.add(user);
```

You can add multiple `Entities` by calling bulk add method on `EntitySet`.

```typescript
import { User } from './app/entities';

// Get entity set.
const users = entityStore.users;

// Create a new users.
const nameX = 'Dmitry';
const userX = new User(name);

const nameY = 'Alex';
const userY = new User(name);

// Add users to an entity set.
const addedUsers = await users.bulkAdd([userX, userY]);
```

Note that some methods may not be supported by certain entity provider. It really depends from used backend API. If method cannot be called for some reason we will get an `Error` so it makes sense to catch it if you are not sure about returned results.

## Query entities

## Updating entities

## Removing entities

## Filter entities

### Equals filter
### Not equals filter
### Contains filter
### Not contains filter
### Starts with filter
### Not starts with filter
### Ends with filter
### Not ends with filter
### In filter
### Not in filter
### Greater filter
### Greater than or equals filter
### Lower filter
### Lower than or equals filter
### And filter
### Or filter

## Sort entities

### Asc sort
### Desc sort

## Paginate entities

### Skip
### Take

## Available entity providers

### InMemory
### JsonApi

## Implementing entity provider

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the versions section on [NPM project page](https://www.npmjs.com/package/@dipscope/entity-store).

See information about breaking changes, release notes and migration steps between versions in [CHANGELOG.md](https://github.com/dipscope/EntityStore.TS/blob/master/CHANGELOG.md) file.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/dipscope/EntityStore.TS/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Dmitry Pimonov** - *Initial work* - [dpimonov](https://github.com/dpimonov)

See also the list of [contributors](https://github.com/dipscope/EntityStore.TS/contributors) who participated in this project.

## Notes

Thanks for checking this package.

Feel free to create an issue if you find any mistakes in documentation or have any improvements in mind.

We wish you good luck and happy coding!

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](https://github.com/dipscope/EntityStore.TS/blob/master/LICENSE.md) file for details.
