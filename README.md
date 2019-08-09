# arac - Async Role Based Access Control

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
  // or:
  const AccessControl = require('arac');
```

### Basic Usage

Define roles, resources one by one:

```typescript
  import {AccessControl} from 'arac';
  const arac = new AccessControl();
  
  arac.role('admin')          // define role
      .role('user')           // define role
  
  // resource inheritance is defined by path
  // if one ot more resources in path are not defined - it creates them automatically
  
      .resource('api')        // define resource
      .resource('api/admin')  // define child resource

  // doing the same as: 
  
      .resource('api/admin') 
```

Define roles, resources and static permissions one by one:

```typescript
  import {AccessControl} from 'arac';
  const arac = new AccessControl();

  // main template for permissions definition:
  // arac.[allow | deny](<role>).[create | read | update | delete](<resource>)
  
  arac.allow('admin') // define new or modify existing role
      .create('api')  // define new or modify existing recource and define new or modify existing permission
      .read('api')    // doing the same as previous line but for read action
      .update('api')  // doing the same as previous line but for update action
      .delete('api')  // doing the same as previous line but for delete action
      
  // if one or more recources or roles were not defined before - it creates them automatically
  // by default permission is denied
```

Get permission:

```typescript
  import {AccessControl} from 'arac';
  const arac = new AccessControl();
  
  // ... roles and permissions definition
  
  // main template for permissions definition:
  // arac.can(<role>).[create | read | update | delete](<resource>) : Promise
  
  arac.can('admin').create('api')
      .then((res) => {
        // allowed
      })
      .catch((error) => {
        // denied
      })
```

### Custom Checkers

### Dump Import
