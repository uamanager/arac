import {AccessControl} from '../src';
import * as dump from './data/dump.json';

let arac;

const checkersMap = {
  'dynamicCheckerResolve': jest.fn((action, roleName, resourceName): Promise<any> => {
    return Promise.resolve(true);
  }),
  'dynamicCheckerReject': jest.fn((action, roleName, resourceName): Promise<any> => {
    return Promise.reject(false);
  })
};

beforeEach(() => {
  arac = new AccessControl();
});

afterEach(() => {
  arac = undefined;
});


describe('Access Control', () => {

  it('creates instance of AccessControl', () => {
    expect(arac instanceof AccessControl).toBe(true);
  });

  it('imports dump', () => {
    arac.import(dump, checkersMap);

    expect(arac).toMatchSnapshot();
  });

  it('exports dump', () => {
    arac.import(dump, checkersMap);
    const _dump = arac.export();

    _dump.forEach(permission => {
      return expect(dump).toEqual(expect.arrayContaining([
        expect.objectContaining(permission)
      ]));
    });

    dump.forEach(permission => {
      return expect(_dump).toEqual(expect.arrayContaining([
        expect.objectContaining(permission)
      ]));
    });

    expect(_dump.length).toBe(dump.length);
  });

  it('creates role and not creates role copy or throws error', () => {
    arac.role('testRole');
    expect(arac).toMatchSnapshot();

    arac.role('testRole');
    expect(arac).toMatchSnapshot();
  });

  it('creates first level resource', () => {
    arac.resource('testResource1');
    expect(arac).toMatchSnapshot();
  });

  it('creates second level resource', () => {
    arac.resource('testResource1/testResource2');
    expect(arac).toMatchSnapshot();
  });

  it('creates role, resources and permission', () => {
    arac.allow('testRole').create('testResource1/testResource2');
    expect(arac).toMatchSnapshot();
    arac.allow('testRole').read('testResource1/testResource2');
    expect(arac).toMatchSnapshot();
    arac.allow('testRole').update('testResource1/testResource2');
    expect(arac).toMatchSnapshot();
    arac.allow('testRole').delete('testResource1/testResource2');
    expect(arac).toMatchSnapshot();
  });

  it('creates role, resources and permission with dynamic checker', () => {
    arac.allow('testRole')
      .create(
        'testResource1/testResource2',
        {dynamicCheckerResolve: checkersMap.dynamicCheckerResolve}
      );
    expect(arac).toMatchSnapshot();
    arac.allow('testRole')
      .read(
        'testResource1/testResource2',
        {dynamicCheckerReject: checkersMap.dynamicCheckerReject}
      );
    expect(arac).toMatchSnapshot();
    arac.allow('testRole')
      .update(
        'testResource1/testResource2',
        {dynamicCheckerResolve: checkersMap.dynamicCheckerResolve}
      );
    expect(arac).toMatchSnapshot();
    arac.allow('testRole')
      .delete(
        'testResource1/testResource2',
        {dynamicCheckerReject: checkersMap.dynamicCheckerReject}
      );
    expect(arac).toMatchSnapshot();
  });

  it('resolves static permission', () => {
    arac.allow('testRole')
      .create(
        'testResource1/testResource2'
      );
    expect(arac.can('testRole').create('testResource1/testResource2'))
      .resolves
      .toEqual(true);
  });

  it('rejects static permission', () => {
    arac.deny('testRole')
      .create(
        'testResource1/testResource2'
      );

    expect(arac.can('testRole').create('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });

  it('rejects not existed permission', () => {
    expect(arac.can('testRole').create('testResource1/testResource2'))
      .rejects
      .toEqual(false);
  });

  it('resolves dynamic permission', () => {
    arac.allow('testRole')
      .create(
        'testResource1/testResource2',
        {dynamicCheckerResolve: checkersMap.dynamicCheckerResolve}
      );

    expect(arac.can('testRole').create('testResource1/testResource2'))
      .resolves
      .toEqual(true);
  });

  it('rejects dynamic permission', () => {
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

