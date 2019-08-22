import {AccessControl, TAccessControlDynamicCheckersMap} from './accessControl';
import {Actions} from './actions';

export class AccessCreate {
  constructor (
    public roleName: string,
    public allowed: boolean,
    public accessControl: AccessControl
  ) {}

  public create (
    resourceName: string,
    dynamicCheckers?: TAccessControlDynamicCheckersMap
  ) {
    this.createPermission(Actions.CREATE, resourceName, dynamicCheckers);

    return this;
  }

  public read (
    resourceName: string,
    dynamicCheckers?: TAccessControlDynamicCheckersMap
  ) {
    this.createPermission(Actions.READ, resourceName, dynamicCheckers);

    return this;
  }

  public update (
    resourceName: string,
    dynamicCheckers?: TAccessControlDynamicCheckersMap
  ) {
    this.createPermission(Actions.UPDATE, resourceName, dynamicCheckers);

    return this;
  }

  public delete (
    resourceName: string,
    dynamicCheckers?: TAccessControlDynamicCheckersMap
  ) {
    this.createPermission(Actions.DELETE, resourceName, dynamicCheckers);

    return this;
  }

  private createPermission (
    action: Actions,
    resourceName: string,
    dynamicCheckers: TAccessControlDynamicCheckersMap
  ) {
    this.accessControl.permission(
      action,
      AccessControl.hash(this.roleName, resourceName),
      this.allowed,
      dynamicCheckers
    );
  }
}
