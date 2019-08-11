# arac - Async Role Based Access Control
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
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

Sometimes static checkers are not enough, so you can defined dynamic:

```typescript
  
```

### Dump Import
