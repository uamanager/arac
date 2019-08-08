import {Actions} from './actions';

export class StaticChecker {
  public permissions: { [key in Actions]: boolean } = {
    create: false,
    read: false,
    update: false,
    delete: false
  };

  constructor (permissions?: { [key in Actions]: boolean }) {
    if (permissions) {
      this.permissions = permissions;
    }
  }

  public check (
    action: Actions,
    roleName: string,
    resourceName: string
  ): Promise<any> {
    if (this.permissions.hasOwnProperty(action)) {
      return this.permissions[action] ? Promise.resolve(true) : Promise.reject(false);
    }
    return Promise.reject(false);
  }
}
