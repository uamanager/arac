import {AccessControl} from './accessControl';
import {Actions} from './actions';
import {TDynamicCheckerFunction} from './dynamicChecker';

export class AccessCreate {
  constructor (
    public roleName: string,
    public allowed: boolean,
    public accessControl: AccessControl
  ) {}

  public create (resourceName: string, dynamicCheckers?: {
    [key: string]: TDynamicCheckerFunction
  }) {
    this.accessControl.permission(
      Actions.CREATE,
      AccessControl.hash(this.roleName, resourceName),
      this.allowed,
      dynamicCheckers
    );

    return this;
  }

  public read (resourceName: string, dynamicCheckers?: {
    [key: string]: TDynamicCheckerFunction
  }) {
    this.accessControl.permission(
      Actions.READ,
      AccessControl.hash(this.roleName, resourceName),
      this.allowed,
      dynamicCheckers
    );

    return this;
  }

  public update (resourceName: string, dynamicCheckers?: {
    [key: string]: TDynamicCheckerFunction
  }) {
    this.accessControl.permission(
      Actions.UPDATE,
      AccessControl.hash(this.roleName, resourceName),
      this.allowed,
      dynamicCheckers
    );

    return this;
  }

  public delete (resourceName: string, dynamicCheckers?: {
    [key: string]: TDynamicCheckerFunction
  }) {
    this.accessControl.permission(
      Actions.DELETE,
      AccessControl.hash(this.roleName, resourceName),
      this.allowed,
      dynamicCheckers
    );

    return this;
  }
}
