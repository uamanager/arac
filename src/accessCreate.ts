import {AccessControl} from './accessControl';
import {Actions} from './actions';
import {TPermissionCheckersMap} from './permission';

export class AccessCreate {
  constructor (
    public roleName: string,
    public allowed: boolean,
    public accessControl: AccessControl
  ) {}

  public create (
    resourceName: string,
    dynamicCheckers?: TPermissionCheckersMap
  ) {
    this.createPermission(Actions.CREATE, resourceName, dynamicCheckers);

    return this;
  }

  public read (
    resourceName: string,
    dynamicCheckers?: TPermissionCheckersMap
  ) {
    this.createPermission(Actions.READ, resourceName, dynamicCheckers);

    return this;
  }

  public update (
    resourceName: string,
    dynamicCheckers?: TPermissionCheckersMap
  ) {
    this.createPermission(Actions.UPDATE, resourceName, dynamicCheckers);

    return this;
  }

  public delete (
    resourceName: string,
    dynamicCheckers?: TPermissionCheckersMap
  ) {
    this.createPermission(Actions.DELETE, resourceName, dynamicCheckers);

    return this;
  }

  private createPermission (
    action: Actions,
    resourceName: string,
    dynamicCheckers: TPermissionCheckersMap
  ) {
    this.accessControl.permission(
      action,
      this.roleName,
      resourceName,
      this.allowed,
      dynamicCheckers
    );
  }
}
