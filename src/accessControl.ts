import {AccessCreate} from './accessCreate';
import {AccessRequest} from './accessRequest';
import {Actions} from './actions';
import {TDynamicCheckerFunction} from './dynamicChecker';
import {Permission} from './permission';
import {Resource} from './resource';
import {Role} from './role';

export type TAccessControlOptions = {
  logger?: { log: (...args) => any, error: (...args) => any },
  debug?: boolean
};

export type TAccessControlDump = {
  [key: string]: Partial<{ [key in Actions]: [boolean, ...string[]] }>
};

const defaultAccessControlOptions: TAccessControlOptions = {
  logger: console,
  debug: true
};

export class AccessControl {
  public options: TAccessControlOptions;

  constructor (
    dump: TAccessControlDump = {},
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
    Object
      .keys(dump)
      .forEach((hash) => {
        Object
          .keys(Actions)
          .forEach((actionName) => {
            const action = Actions[actionName];
            if (!dump[hash].hasOwnProperty(action)) {
              return;
            }
            const [staticChecker, ...dynamicCheckers] = dump[hash][action];
            const dynamicCheckersFunctions = dynamicCheckers.map((functionName) => {
                if (checkersMap.hasOwnProperty(functionName)) {
                  return checkersMap[functionName];
                } else {
                  this.error('AccessControl', 'import', `${functionName} is not defined in checkers map.`);
                }
              });
            this.permission(action, hash, staticChecker, dynamicCheckersFunctions);
          });
      });
  }

  public export (): TAccessControlDump {
    let result = {};
    Object.keys(this.permissions).forEach(name => {
      result[name] = {};
      Object.keys(Actions).forEach((actionName) => {
        result[name][Actions[actionName]] = [
          this.permissions[name].staticChecker.permissions[Actions[actionName]],
          ...Object.keys(this.permissions[name].dynamicCheckers[Actions[actionName]])
        ];
      });
    });
    return result;
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
    patch: Partial<{ [key in Actions]: boolean }>,
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

    this._permissions[hash].patch(patch);
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

  public log (className, methodName, message) {
    if (this.options.debug) {
      const log = `Class: '${className}', Method: '${methodName}', Message: '${message}'`;
      this.options.logger.log(log);
    }
  }

  public error (className, methodName, message) {
    throw new Error(`Class: '${className}', Method: '${methodName}', Error: '${message}'`);
  }
}
