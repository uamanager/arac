import {Actions} from './actions';

export type TDynamicCheckerFunction = (
  action: Actions,
  roleName: string,
  resourceName: string
) => Promise<any>;

export class DynamicChecker {
  constructor (
    public checker: TDynamicCheckerFunction
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
