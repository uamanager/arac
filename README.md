# arac - Async Role Based Access Control

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://img.shields.io/circleci/build/github/uamanager/arac/master?token=abc123def456)](https://circleci.com/gh/uamanager/arac)

## Installation

```bash
    # with yarn:
    yarn add arac
    # with npm:
    npm i --save arac
```

## Usage

### Import

```typescript
    import {AccessControl} from 'arac';
```
or
```javascript
    const AccessControl = require('arac').AccessControl;
```

### Basic Usage

Define roles one by one:

```typescript
    import {AccessControl} from 'arac';
    const arac = new AccessControl();
    
    arac.role('admin')          // define role
      .role('user')           // define role
      
 ```
 
 Resources can have child resources. Inheritance is defined by path.
 If one ot more resources in path are not defined - it creates them automatically.
 
 ```typescript
    import {AccessControl} from 'arac';
    const arac = new AccessControl();
        
    arac.resource('api')        // define resource
        .resource('api/admin')  // define child resource
        
        // doing the same as: 
        .resource('api/admin') 
```

Define roles, resources and static permissions one by one:

`arac.[allow | deny](<role>).[create | read | update | delete](<resource>)`

  If one or more resources or roles were not defined before - it creates them automatically.
  By default permission is denied.

```typescript
    import {AccessControl} from 'arac';
    const arac = new AccessControl();
    
    arac.allow('admin') // define new or modify existing role
        .create('api')  // define new or modify existing recource and define new or modify existing permission
        .read('api')    // doing the same as previous line but for read action
        .update('api')  // doing the same as previous line but for update action
        .delete('api')  // doing the same as previous line but for delete action
```

Check permission:

`arac.can(<role>).[create | read | update | delete](<resource>) : Promise`

```typescript
    import {AccessControl} from 'arac';
    const arac = new AccessControl();
    
    // ... roles and permissions definition
    
    arac.can('admin').create('api')
        .then((res) => {
            // allowed
        })
        .catch((error) => {
            // denied
        })
```

### Custom Checkers

Sometimes static checker is not enough, so you can define additional dynamic. All of the checkers works sequentially starting from static one.

```typescript
    import {AccessControl} from 'arac';
    const arac = new AccessControl();
    
    arac.allow('admin').create('api', {
        'checkerName1': (action: Actions, roleName: string, resourceName: string): Promise<any> => {
            let result = false;
    
            // dynamic checker body
    
            return result ? Promise.resolve() : Promise.reject();
        },
        'checkerName2': (action: Actions, roleName: string, resourceName: string): Promise<any> => {
            let result = false;
    
            // dynamic checker body
    
            return result ? Promise.resolve() : Promise.reject();
        }
    });
    
    arac.can('admin').create('api')
        .then((res) => {
            // allowed
        })
        .catch((error) => {
            // denied
        }); 
    // static checker will resolve promise
    // but depending on result of dynamic checker(-s) Promise can be rejected
    // if one of the checkers rejects - whole check is rejected
```

### Export

For export just call `export()` method:

```typescript
    import {AccessControl} from 'arac';
    const arac = new AccessControl();
 
    // ... roles and permissions definition

    const dump = arac.export();
```

Type definition of dump:

```typescript
    type TAccessControlDump = {
        role: string,
        resource: string,
        permissions: Partial<{ [key in Actions]: [boolean, ...string[]] }>
    }[];
```

Example of dump:

```typescript
    // [ 
    //  { 
    //      'role': 'role1',    
    //      'resource': 'resource1',    
    //      'permissions': {
    //          'create': [true, 'dynamicCheckerName1'],
    //          'read': [false, 'dynamicCheckerName2'],
    //          'update': [true, 'dynamicCheckerName3'],
    //          'delete': [false, 'dynamicCheckerName4']
    //      },    
    //  },
    //  { 
    //      'role': 'role2',    
    //      'resource': 'resource2',    
    //      'permissions': {
    //          'create': [true, 'dynamicCheckerName1'],
    //          'read': [false, 'dynamicCheckerName2'],
    //          'update': [true, 'dynamicCheckerName3'],
    //          'delete': [false, 'dynamicCheckerName4']
    //      },    
    //  },
    //  ...
    // ]
```

### Import

Type definition for import dump is the same as from export method.
All roles, resources and permissions not existed in `AccessControl` will be defined.

For import just pass dump and dynamic checkers map in `controller(dump, chekersMap)` or `import(dump, chekersMap)` method:

```typescript
    import {AccessControl} from 'arac';

    const dump = [ 
         { 
             'role': 'role1',    
             'resource': 'resource1',    
             'permissions': {
                 'create': [true, 'dynamicCheckerName1'],
                 'read': [false, 'dynamicCheckerName2'],
                 'update': [true, 'dynamicCheckerName3'],
                 'delete': [false, 'dynamicCheckerName4']
             },    
         },
         { 
             'role': 'role2',    
             'resource': 'resource2',    
             'permissions': {
                 'create': [true, 'dynamicCheckerName1'],
                 'read': [false, 'dynamicCheckerName2'],
                 'update': [true, 'dynamicCheckerName3'],
                 'delete': [false, 'dynamicCheckerName4']
             },    
         },
     ];

    const checkersMap = {
        'dynamicCheckerName1': (action, roleName, resourceName): Promise<any> => {
            // return Promise.resolve();
        },
        'dynamicCheckerName2': (action, roleName, resourceName): Promise<any> => {
            // return Promise.resolve();
        },
        'dynamicCheckerName3': (action, roleName, resourceName): Promise<any> => {
            // return Promise.resolve();
        },
        'dynamicCheckerName4': (action, roleName, resourceName): Promise<any> => {
            // return Promise.resolve();
        }
    }
    
    const arac = new AccessControl(dump, checkersMap);
    // or    
    const dump = arac.import(dump, checkersMap);
```
