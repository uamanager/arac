import {AccessControl} from './accessControl';
import {Actions} from './actions';
import {Permission, STATIC_CHECKER_NAME} from './permission';

export class AccessRequest {
  constructor (
    public roleName: string,
    public accessControl: AccessControl
  ) {}

  create (resourceName: string) {
    return this.getPermission(Actions.CREATE, resourceName);
  }

  read (resourceName: string) {
    return this.getPermission(Actions.READ, resourceName);
  }

  update (resourceName: string) {
    return this.getPermission(Actions.UPDATE, resourceName);
  }

  delete (resourceName: string) {
    return this.getPermission(Actions.DELETE, resourceName);
  }

  private getPermission (action: Actions, resourceName: string) {
    const permissions = this.accessControl.permissions[Permission.hash(
      this.roleName,
      resourceName,
      action
    )];
    return permissions ? this.check(action, resourceName, permissions) : Promise.reject(
      false);
  }

  private check (
    action: Actions,
    resourceName: string,
    permissions: Permission
  ) {
    const staticChecker = permissions.checkers[STATIC_CHECKER_NAME];
    const dynamicCheckers = Object.keys(permissions.checkers)
      .filter(name => name !== STATIC_CHECKER_NAME)
      .map(name => permissions.checkers[name]);

    const checkers = [staticChecker, ...dynamicCheckers];

    return checkers.reduce((prev, next) => {
      return prev
        .then(() => next.check(action, this.roleName, resourceName))
        .catch((err) => {
          return Promise.reject(err);
        });
    }, Promise.resolve(true));
  }
}
