import {Actions} from './actions';
import {DynamicChecker, TDynamicCheckerFunction} from './dynamicChecker';
import {Resource} from './resource';
import {Role} from './role';
import {StaticChecker} from './staticChecker';

export class Permission {
  public staticChecker: StaticChecker;
  public dynamicCheckers: { [key in Actions]: { [key: string]: DynamicChecker } } = {
    [Actions.CREATE]: {},
    [Actions.READ]: {},
    [Actions.UPDATE]: {},
    [Actions.DELETE]: {}
  };

  constructor (
    readonly role: Role,
    readonly resource: Resource
  ) {
    this.staticChecker = new StaticChecker();
  }

  public patch (patch: Partial<{ [key in Actions]: boolean }>) {
    this.staticChecker = new StaticChecker({
      ...this.staticChecker.permissions,
      ...patch
    });
  }

  public addChecker (
    action: Actions,
    name: string,
    checker: TDynamicCheckerFunction
  ) {
    this.dynamicCheckers[action][name] = new DynamicChecker(checker);
  }
}
