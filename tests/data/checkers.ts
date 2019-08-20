export const checkersMap = {
  'dynamicCheckerResolve': jest.fn((action, roleName, resourceName): Promise<any> => {
    return Promise.resolve(true);
  }),
  'dynamicCheckerReject': jest.fn((action, roleName, resourceName): Promise<any> => {
    return Promise.reject(false);
  })
};
