import {Actions} from './actions';

export type TCheckerFunction = (
  action: Actions,
  roleName: string,
  resourceName: string
) => Promise<boolean>;

export class Checker {
  constructor (
    public name: string,
    public action: Actions,
    public checker: TCheckerFunction
  ) {
  }

  check (
    action: Actions,
    roleName: string,
    resourceName: string
  ) {
    return this.checker(action, roleName, resourceName);
  }
}
