import {Actions} from './actions';
import {Checker, TCheckerFunction} from './checker';
import {Resource} from './resource';
import {Role} from './role';
import {StaticChecker} from './staticChecker';

export type TPermissionDump = {
  role: string,
  resource: string,
  action: Actions,
  permissions: [boolean, ...string[]]
};

export type TPermissionCheckersMap = {
  [key: string]: TCheckerFunction
};

export const STATIC_CHECKER_NAME = 'static';

export class Permission {
  public checkers: { [key: string]: Checker } = {};

  constructor (
    readonly role: Role,
    readonly resource: Resource,
    readonly action: Actions,
    permission: boolean = false,
    dynamicCheckers: TPermissionCheckersMap = {}
  ) {
    this.checkers[STATIC_CHECKER_NAME] = new StaticChecker(
      STATIC_CHECKER_NAME,
      action,
      permission
    );

    Object.keys(dynamicCheckers)
      .forEach((dynamicCheckerName) => {
        if (dynamicCheckerName === STATIC_CHECKER_NAME) {
          throw new Error(`checker cannot have '${dynamicCheckerName}' name.`);
        }
        this.checkers[dynamicCheckerName] = new Checker(
          dynamicCheckerName,
          action,
          dynamicCheckers[dynamicCheckerName]
        );
      });
  }

  public static hash (roleName: string, resourceName: string, action: string): string {
    return [resourceName, roleName, action].join('#');
  }

  public static import (
    permissionDump: TPermissionDump,
    role: Role,
    resource: Resource,
    checkersMap: TPermissionCheckersMap = {}
  ): Permission {
    if (!Object.values(Actions).includes(permissionDump.action)) {
      throw new Error(`checker cannot have '${permissionDump.action}' action.`);
    }
    const [staticChecker, ...dynamicCheckers] = permissionDump.permissions;

    const dynamicCheckersFunctions = dynamicCheckers.reduce((
      previousValue,
      functionName: string
    ) => {
      if (!checkersMap.hasOwnProperty(functionName)) {
        throw new Error(`${functionName} is not defined in checkers map.`);
      }
      return {...previousValue, [functionName]: checkersMap[functionName]};
    }, {});

    return new Permission(
      role,
      resource,
      permissionDump.action,
      staticChecker,
      dynamicCheckersFunctions
    );
  }

  public static export (permission: Permission): TPermissionDump {
    const staticCheckerPermission = (permission.checkers[STATIC_CHECKER_NAME] as StaticChecker).permission;
    const dynamicCheckers = Object.keys(permission.checkers)
      .filter(name => name !== STATIC_CHECKER_NAME);
    const permissions: [boolean, ...string[]] = [
      staticCheckerPermission, ...dynamicCheckers
    ];

    return {
      role: permission.role.name,
      resource: permission.resource.name,
      action: permission.action,
      permissions
    };
  }
}
