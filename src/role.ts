import {AccessControl} from './accessControl';

export class Role {
  constructor (private name: string, private accessControl: AccessControl) {
  }

  public role (name: string) {
    return this.accessControl.role(name);
  }

  public resource (name: string) {
    return this.accessControl.resource(name);
  }
}
