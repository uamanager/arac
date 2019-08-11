import {AccessControl} from './accessControl';
import {Role} from './role';

export class Resource {
  readonly children: { [key: string]: Resource } = {};

  constructor (
    readonly name: string,
    readonly path: string,
    readonly accessControl: AccessControl,
    readonly parent: Resource | null = null
  ) {
    this.name = Resource.nameFromPath(path);
  }

  private static fromPath (path: string): string[] {
    return path.split('/');
  }

  private static toPath (fromPath: string[]): string {
    return fromPath.join('/');
  }

  private static nameFromPath (path: string): string {
    const fromPath = Resource.fromPath(path);
    return fromPath[fromPath.length - 1];
  }

  public role (name: string): Role {
    return this.accessControl.role(name);
  }

  public resource (path: string): Resource {
    return this.accessControl.resource(path);
  }

  public check (path: string): boolean {
    const fromPath = Resource.fromPath(path);
    if (fromPath.length) {
      const checkName = fromPath.splice(0, 1)[0];
      if (this.children.hasOwnProperty(checkName)) {
        const toPath = Resource.toPath(fromPath);
        return toPath ? this.children[checkName].check(toPath) : true;
      } else {
        return false;
      }
    }
    return true;
  }

  public get (path: string): Resource {
    const fromPath = Resource.fromPath(path);
    const checkName = fromPath.splice(0, 1)[0];
    if (fromPath.length) {
      const toPath = Resource.toPath(fromPath);
      return this.children[checkName].get(toPath);
    } else {
      return this.children[checkName];
    }
  }

  public add (path: string, accessControl: AccessControl): Resource {
    const fromPath = Resource.fromPath(path);
    if (fromPath.length) {
      const checkName = fromPath.splice(0, 1)[0];
      if (!this.children.hasOwnProperty(checkName)) {
        const newPath = Resource.toPath(this.path ? [this.path, checkName] : [checkName]);
        this.children[checkName] = new Resource(checkName, newPath, accessControl, this);
      }
      const toPath = Resource.toPath(fromPath);
      return toPath
             ? this.children[checkName].add(toPath, accessControl)
             : this.children[checkName];
    } else {
      return this;
    }
  }
}
