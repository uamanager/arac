import {AccessControl} from '../src';
import {checkersMap} from './data/checkers';

let arac;

beforeEach(() => {
  arac = new AccessControl();
});

afterEach(() => {
  arac = undefined;
});

describe('Access Control Permissions CREATE', () => {
  it('resolves static create permission', () => {
    arac.allow('testRole')
      .create(
        'testResource1/testResource2'
      );
    expect(arac.can('testRole').create('testResource1/testResource2'))
      .resolves
      .toEqual(true);
  });

  it('rejects static create permission', () => {
    arac.deny('testRole')
      .create(
        'testResource1/testResource2'
      );

    expect(arac.can('testRole').create('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });

  it('rejects not existed create permission', () => {
    expect(arac.can('testRole').create('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });

  it('resolves dynamic create permission', () => {
    arac.allow('testRole')
      .create(
        'testResource1/testResource2',
        {dynamicCheckerResolve: checkersMap.dynamicCheckerResolve}
      );

    expect(arac.can('testRole').create('testResource1/testResource2'))
      .resolves
      .toEqual(true);
  });

  it('rejects dynamic create permission', () => {
    arac.allow('testRole')
      .create(
        'testResource1/testResource2',
        {dynamicCheckerReject: checkersMap.dynamicCheckerReject}
      );

    expect(arac.can('testRole').create('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });
});

describe('Access Control Permissions READ', () => {
  it('resolves static read permission', () => {
    arac.allow('testRole')
      .read(
        'testResource1/testResource2'
      );
    expect(arac.can('testRole').read('testResource1/testResource2'))
      .resolves
      .toEqual(true);
  });

  it('rejects static read permission', () => {
    arac.deny('testRole')
      .read(
        'testResource1/testResource2'
      );

    expect(arac.can('testRole').read('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });

  it('rejects not existed read permission', () => {
    expect(arac.can('testRole').read('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });

  it('resolves dynamic read permission', () => {
    arac.allow('testRole')
      .read(
        'testResource1/testResource2',
        {dynamicCheckerResolve: checkersMap.dynamicCheckerResolve}
      );

    expect(arac.can('testRole').read('testResource1/testResource2'))
      .resolves
      .toEqual(true);
  });

  it('rejects dynamic read permission', () => {
    arac.allow('testRole')
      .read(
        'testResource1/testResource2',
        {dynamicCheckerReject: checkersMap.dynamicCheckerReject}
      );

    expect(arac.can('testRole').read('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });
});

describe('Access Control Permissions UPDATE', () => {
  it('resolves static update permission', () => {
    arac.allow('testRole')
      .update(
        'testResource1/testResource2'
      );
    expect(arac.can('testRole').update('testResource1/testResource2'))
      .resolves
      .toEqual(true);
  });

  it('rejects static update permission', () => {
    arac.deny('testRole')
      .update(
        'testResource1/testResource2'
      );

    expect(arac.can('testRole').update('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });

  it('rejects not existed update permission', () => {
    expect(arac.can('testRole').update('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });

  it('resolves dynamic update permission', () => {
    arac.allow('testRole')
      .update(
        'testResource1/testResource2',
        {dynamicCheckerResolve: checkersMap.dynamicCheckerResolve}
      );

    expect(arac.can('testRole').update('testResource1/testResource2'))
      .resolves
      .toEqual(true);
  });

  it('rejects dynamic update permission', () => {
    arac.allow('testRole')
      .update(
        'testResource1/testResource2',
        {dynamicCheckerReject: checkersMap.dynamicCheckerReject}
      );

    expect(arac.can('testRole').update('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });
});

describe('Access Control Permissions DELETE', () => {
  it('resolves static delete permission', () => {
    arac.allow('testRole')
      .delete(
        'testResource1/testResource2'
      );
    expect(arac.can('testRole').delete('testResource1/testResource2'))
      .resolves
      .toEqual(true);
  });

  it('rejects static delete permission', () => {
    arac.deny('testRole')
      .delete(
        'testResource1/testResource2'
      );

    expect(arac.can('testRole').delete('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });

  it('rejects not existed delete permission', () => {
    expect(arac.can('testRole').delete('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });

  it('resolves dynamic delete permission', () => {
    arac.allow('testRole')
      .delete(
        'testResource1/testResource2',
        {dynamicCheckerResolve: checkersMap.dynamicCheckerResolve}
      );

    expect(arac.can('testRole').delete('testResource1/testResource2'))
      .resolves
      .toEqual(true);
  });

  it('rejects dynamic delete permission', () => {
    arac.allow('testRole')
      .delete(
        'testResource1/testResource2',
        {dynamicCheckerReject: checkersMap.dynamicCheckerReject}
      );

    expect(arac.can('testRole').delete('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });
});
