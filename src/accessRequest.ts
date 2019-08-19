import {AccessControl} from './accessControl';
import {Actions} from './actions';
import {Permission} from './permission';

export class AccessRequest {
  constructor (
    public roleName: string,
    public accessControl: AccessControl
  ) {}

  create (resourceName: string) {
    const permissions = this.accessControl.permissions[AccessControl.hash(
      this.roleName,
      resourceName
    )];
    return this.check(Actions.CREATE, resourceName, permissions);
  }

  read (resourceName: string) {
    const permissions = this.accessControl.permissions[AccessControl.hash(
      this.roleName,
      resourceName
    )];
    return this.check(Actions.READ, resourceName, permissions);
  }

  update (resourceName: string) {
    const permissions = this.accessControl.permissions[AccessControl.hash(
      this.roleName,
      resourceName
    )];
    return this.check(Actions.UPDATE, resourceName, permissions);
  }

  delete (resourceName: string) {
    const permissions = this.accessControl.permissions[AccessControl.hash(
      this.roleName,
      resourceName
    )];

    return this.check(Actions.DELETE, resourceName, permissions);
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
      return prev.then(() => !!next.check ? next.check(
        action,
        this.roleName,
        resourceName
        ) : Promise.resolve(true))
        .catch((err) => {
          return Promise.reject(err);
        });
    }, Promise.resolve(true));
  }
}
