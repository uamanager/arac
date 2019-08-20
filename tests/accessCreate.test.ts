import {AccessControl} from '../src';
import {checkersMap} from './data/checkers';

let arac;

beforeEach(() => {
  arac = new AccessControl();
});

afterEach(() => {
  arac = undefined;
});


describe('Access Create CREATE', () => {
  it('creates role, resources and CREATE permission', () => {
    arac.allow('testRole').create('testResource1/testResource2');
    expect(arac).toMatchSnapshot();
  });

  it('creates role, resources and CREATE permission with dynamic checker', () => {
    arac.allow('testRole')
      .create(
        'testResource1/testResource2',
        {dynamicCheckerResolve: checkersMap.dynamicCheckerResolve}
      );
    expect(arac).toMatchSnapshot();
  });
});

describe('Access Create READ', () => {
  it('creates role, resources and READ permission', () => {
    arac.allow('testRole').read('testResource1/testResource2');
    expect(arac).toMatchSnapshot();
  });

  it('creates role, resources and READ permission with dynamic checker', () => {
    arac.allow('testRole')
      .read(
        'testResource1/testResource2',
        {dynamicCheckerReject: checkersMap.dynamicCheckerReject}
      );
    expect(arac).toMatchSnapshot();
  });
});

describe('Access Create UPDATE', () => {
  it('creates role, resources and UPDATE permission', () => {
    arac.allow('testRole').update('testResource1/testResource2');
    expect(arac).toMatchSnapshot();
  });

  it('creates role, resources and UPDATE permission with dynamic checker', () => {
    arac.allow('testRole')
      .update(
        'testResource1/testResource2',
        {dynamicCheckerResolve: checkersMap.dynamicCheckerResolve}
      );
    expect(arac).toMatchSnapshot();
  });
});

describe('Access Create DELETE', () => {
  it('creates role, resources and DELETE permission', () => {
    arac.allow('testRole').delete('testResource1/testResource2');
    expect(arac).toMatchSnapshot();
  });

  it('creates role, resources and DELETE permission with dynamic checker', () => {
    arac.allow('testRole')
      .delete(
        'testResource1/testResource2',
        {dynamicCheckerReject: checkersMap.dynamicCheckerReject}
      );
    expect(arac).toMatchSnapshot();
  });
});
