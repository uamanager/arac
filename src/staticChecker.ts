import {Actions} from './actions';
import {Checker} from './checker';

export class StaticChecker extends Checker {
  constructor (
    name: string,
    action: Actions,
    public permission: boolean = false
  ) {
    super(
      name,
      action,
      () => {
        return permission ? Promise.resolve(true) : Promise.reject(false);
      }
    );
  }
}
