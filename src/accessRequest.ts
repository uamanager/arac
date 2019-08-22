import {AccessControl} from './accessControl';
import {Actions} from './actions';
import {Permission} from './permission';

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

  private getPermission (action: Actions, resourceName: string){
    const permissions = this.accessControl.permissions[AccessControl.hash(
      this.roleName,
      resourceName
    )];
    return this.check(action, resourceName, permissions);
  }

  private check (
    action: Actions,
    resourceName: string,
    permissions: Permission | undefined
  ) {
    const checkers = [];

    if (!!permissions) {
      const dynamicCheckers = permissions.dynamicCheckers[action];
      checkers.push(
        permissions.staticChecker,
        ...Object.keys(dynamicCheckers).map(name => dynamicCheckers[name])
      );
    } else {
      return Promise.reject(false);
    }

    return checkers.reduce((prev, next) => {
      return prev
        .then(() => next.check(action, this.roleName, resourceName))
        .catch((err) => {
          return Promise.reject(err);
        });
    }, Promise.resolve(true));
  }
}
