import {AccessCreate} from './accessCreate';
import {AccessRequest} from './accessRequest';
import {Actions} from './actions';
import {Logger} from './logger';
import {Permission, TPermissionCheckersMap, TPermissionDump} from './permission';
import {Resource} from './resource';
import {Role} from './role';

export type TAccessControlDump = TPermissionDump[];

export class AccessControl {
  private l: Logger = new Logger('AccessControl');

  constructor (
    dump: TAccessControlDump = [],
    checkersMap: TPermissionCheckersMap = {}
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

  public import (
    dump: TAccessControlDump = [],
    checkersMap: TPermissionCheckersMap = {}
  ) {
    dump.forEach((permission) => {
      const {role: roleName, resource: resourceName, action} = permission;

      const hash = Permission.hash(roleName, resourceName, action);
      const role = this.role(roleName);
      const resource = this.resource(resourceName);

      try {
        this.permissions[hash] = Permission.import(permission, role, resource, checkersMap);
      }
      catch (e) {
        this.l.error('import', e);
      }

      this.l.log('import', `Import finished!`);
    });
  }

  public export (): TAccessControlDump {
    const dump = Object.keys(this.permissions)
      .map(name => Permission.export(this.permissions[name]));

    this.l.log('export', `Export finished!`);

    return dump;
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
    roleName: string,
    resourceName: string,
    patch: boolean,
    dynamicCheckers?: TPermissionCheckersMap
  ) {
    const hash = Permission.hash(roleName, resourceName, action);
    const role = this.role(roleName);
    const resource = this.resource(resourceName);

    try {
      this._permissions[hash] = new Permission(
        role,
        resource,
        action,
        patch,
        dynamicCheckers
      );
    }
    catch (e) {
      this.l.error('permission', e);
    }
  }
}
