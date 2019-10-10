import {AccessControl} from '../src';
import {checkersMap} from './data/checkers';
import * as dump from './data/dump.json';
import * as simpleDump from './data/simplified-dump.json';
import * as errorStaticDump from './data/error-static-dump.json';
import * as errorActionDump from './data/error-action-dump.json';

let arac;

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

  it('imports simplified dump', () => {
    arac.import(simpleDump, checkersMap);

    expect(arac).toMatchSnapshot();
  });

  it('throws error if checkersMap is not specified but used', () => {
    expect(() => {arac.import(simpleDump, {});}).toThrowError(Error);
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

  it('returns roles', () => {
    arac.import(simpleDump, checkersMap);

    expect(arac.roles).toMatchSnapshot();
  });

  it('returns resources', () => {
    arac.import(simpleDump, checkersMap);

    expect(arac.resources).toMatchSnapshot();
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

  it('creates roles and resources in chain', () => {
    arac
      .role('testRole1')
      .resource('testResource1')
      .resource('testResource2')
      .role('testRole2')
      .role('testRole3');
    expect(arac).toMatchSnapshot();
  });

  it('creates resources on existing level', () => {
    arac
      .resource('testResource1')
      .resource('testResource1/testResource2')
      .resource('testResource1/testResource3');
    expect(arac).toMatchSnapshot();
  });

  it('returns existing resources', () => {
    const _old = arac.resource('testResource1/testResource3');
    const _new = arac.resource('testResource1/testResource3');
    expect(_new.path).toBe(_old.path);
  });

  it('creates root resource', () => {
    arac.resource('/');
    expect(arac).toMatchSnapshot();
  });

  it('throws exception for dynamicChecker with name "static" while import', () => {
    expect(() => arac.import(errorStaticDump, checkersMap)).toThrowError(Error);
  });

  it('throws exception for permission with incorrect action while import', () => {
    expect(() => arac.import(errorActionDump, checkersMap)).toThrowError(Error);
  });
});
