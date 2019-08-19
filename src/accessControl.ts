import {AccessCreate} from './accessCreate';
import {AccessRequest} from './accessRequest';
import {Actions} from './actions';
import {TDynamicCheckerFunction} from './dynamicChecker';
import {Permission} from './permission';
import {Resource} from './resource';
import {Role} from './role';

export type TAccessControlDump = {
  role: string,
  resource: string,
  permissions: Partial<{ [key in Actions]: [boolean, ...string[]] }>
}[];

export class AccessControl {
  constructor (
    dump: TAccessControlDump = [],
    checkersMap: { [key: string]: TDynamicCheckerFunction } = {}
  ) {
    this.import(dump, checkersMap);
  }

  private _roles: { [key: string]: Role } = {};

  public get roles () {
    return this._roles;
  }

  private _resources: Resource = new Resource('', '', this);

  public get resources () {
    return this._resources;
  }

  private _permissions: { [key: string]: Permission } = {};

  public get permissions () {
    return this._permissions;
  }

  public static hash (roleName: string, resourceName: string): string {
    return [resourceName, roleName].join('#');
  }

  public static unhash (hash: string): string[] {
    return hash.split('#');
  }

  public import (
    dump: TAccessControlDump,
    checkersMap: { [key: string]: TDynamicCheckerFunction }
  ) {
    dump
      .forEach((permission) => {
        const hash = AccessControl.hash(permission.role, permission.resource);
        Object
          .keys(Actions)
          .forEach((actionName) => {
            const action = Actions[actionName];
            if (!permission.permissions.hasOwnProperty(action)) {
              return;
            }
            const [staticChecker, ...dynamicCheckers] = permission.permissions[action];
            const dynamicCheckersFunctions = dynamicCheckers.reduce((
              previousValue,
              functionName: string
            ) => {
              if (checkersMap.hasOwnProperty(functionName)) {
                return {
                  ...previousValue,
                  [functionName]: checkersMap[functionName]
                };
              } else {
                this.error(
                  'AccessControl',
                  'import',
                  `${functionName} is not defined in checkers map.`
                );
              }
            }, {});
            this.permission(action, hash, staticChecker, dynamicCheckersFunctions);
          });
      });
  }

  public export (): TAccessControlDump {
    return Object.keys(this.permissions)
      .map(name => {
        let permissions = Object.keys(Actions)
          .reduce((previousValue, actionName) => {
            return {
              ...previousValue,
              [Actions[actionName]]: [
                this.permissions[name].staticChecker.permissions[Actions[actionName]],
                ...Object.keys(this.permissions[name].dynamicCheckers[Actions[actionName]])
              ]
            };
          }, {});

        return {
          role: this.permissions[name].role.name,
          resource: this.permissions[name].resource.name,
          permissions
        };
      });
  }

  public allow (roleName: string): AccessCreate {
    return new AccessCreate(roleName, true, this);
  }

  public deny (roleName: string): AccessCreate {
    return new AccessCreate(roleName, false, this);
  }

  public can (roleName: string): AccessRequest {
    return new AccessRequest(roleName, this);
  }

  public role (roleName: string): Role {
    if (this._roles.hasOwnProperty(roleName)) {
      return this._roles[roleName];
    } else {
      this._roles[roleName] = new Role(roleName, this);
      return this._roles[roleName];
    }
  }

  public resource (resourcePath: string): Resource {
    if (this._resources.check(resourcePath)) {
      return this._resources.get(resourcePath);
    } else {
      return this._resources.add(resourcePath, this);
    }
  }

  public permission (
    action: Actions,
    hash: string,
    patch: boolean,
    dynamicCheckers?: {
      [key: string]: TDynamicCheckerFunction
    }
  ) {
    if (!this._permissions.hasOwnProperty(hash)) {
      const [resourceName, roleName] = AccessControl.unhash(hash);
      const role = this.role(roleName);
      const resource = this.resource(resourceName);

      this._permissions[hash] = new Permission(role, resource);
    }

    this._permissions[hash].patch({[action]: patch});

    if (dynamicCheckers) {
      Object.keys(dynamicCheckers)
        .forEach(
          name => this._permissions[hash].addChecker(
            action,
            name,
            dynamicCheckers[name]
          ));
    }
  }

  public error (className: string, methodName: string, message: string) {
    throw new Error(`Class: '${className}', Method: '${methodName}', Error: '${message}'`);
  }
}
