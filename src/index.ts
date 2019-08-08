import {AccessControl} from './accessControl';

export * from './accessControl';
export * from './role';
export * from './resource';

const p = new AccessControl(
  {debug: true},
  {
    'votekeeper/organization#root': {
      create: [true],
      update: [true],
      read: [true],
      delete: [true]
    },
    'votekeeper/ece#root': {create: [true], update: [true], read: [true], delete: [true]},
    'votekeeper/registration#root': {
      create: [true],
      update: [true],
      read: [true],
      delete: [true]
    },
    'votekeeper/fieldStatus#root': {
      create: [true],
      update: [true],
      read: [true],
      delete: [true]
    },
    'votekeeper/violations#root': {
      create: [true],
      update: [true],
      read: [true],
      delete: [true]
    },
    'votekeeper/pvc#root': {create: [true], update: [true], read: [true], delete: [true]},
    'votekeeper/analytics#root': {
      create: [true],
      update: [true],
      read: [true],
      delete: [true]
    },

    'votekeeper/organization#admin': {update: [true, 'testChecker2'], read: [true]},
    'votekeeper/ece#admin': {update: [true], read: [true]},
    'votekeeper/registration#admin': {update: [true, 'testChecker'], read: [true]},
    'votekeeper/fieldStatus#admin': {update: [true], read: [true]},
    'votekeeper/violations#admin': {update: [true], read: [true]},
    'votekeeper/pvc#admin': {update: [true], read: [true]},
    'votekeeper/analytics#admin': {update: [true], read: [true]},

    'votekeeper/organization#user': {read: [true]},
    'votekeeper/ece#user': {read: [true]},
    'votekeeper/registration#user': {read: [true]},
    'votekeeper/fieldStatus#user': {read: [true]},
    'votekeeper/violations#user': {read: [true]},
    'votekeeper/pvc#user': {read: [true]},
    'votekeeper/analytics#user': {read: [true]},

    'votekeeper/organization#guest': {read: [true]},
    'votekeeper/ece#guest': {read: [true]},
    'votekeeper/registration#guest': {read: [true]},
    'votekeeper/fieldStatus#guest': {read: [true]},
    'votekeeper/violations#guest': {read: [true]},
    'votekeeper/pvc#guest': {read: [true]},
    'votekeeper/analytics#guest': {read: [true]}
  }, {
    'testChecker': (action, roleName, resourceName) => {
      return Promise.resolve();
    }
  }
);

// p.resource('votekeeper');
// p.resource('votekeeper/organization');
// p.resource('votekeeper/ece');
// p.resource('votekeeper/registration');
// p.resource('votekeeper/fieldStatus');
// p.resource('votekeeper/violations');
// p.resource('votekeeper/pvc');
// p.resource('votekeeper/analytics');
// p.resource('votekeeper/organization/tree/search/filter/town');

// p.role('root'); //create role directly
// p.resource('db'); //create resource directly
//
// p.role('root') //get role directly
//   .resource('graphql'); //create resource from role object
//
// p.resource('db') //get resource directly
//   .role('admin'); //create role from resource object

// p.allow('root')
//   .create('votekeeper/organization');
// p.allow('root').update('votekeeper/ece');
// p.allow('admin')
//   .create(
//     'votekeeper/organization',
//     {
//       'testChecker': (...args) => {
//         return Promise.resolve();
//       }
//     }
//   );
// p.allow('admin').update('votekeeper/organization');
// p.can('admin').read('votekeeper/organization');

//console.log(util.inspect(p.permissions, false, null, true));
//
// console.log(p.permissions);
// console.log(p.export());
