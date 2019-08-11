import {AccessControl} from './accessControl';

export class Role {
  constructor (readonly name: string, readonly accessControl: AccessControl) {
  }

  public role (name: string) {
    return this.accessControl.role(name);
  }

  public resource (name: string) {
    return this.accessControl.resource(name);
  }
}
