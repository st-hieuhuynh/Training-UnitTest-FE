import { AuthContextService } from '../authContext.service';
import { AuthStorageService } from '../authStorage.service';

jest.mock<typeof import('../authStorage.service')>(
  '../authStorage.service',
  () => {
    return {
      AuthStorageService: jest.fn(() => {
        return {
          ACCESS_TOKEN: 'token',
          getToken: jest.fn(),
          setToken: jest.fn(),
          removeToken: jest.fn(),
        };
      }),
    };
  }
);

describe('AuthContextService', () => {
  let authContextService;
  let authStorageService;

  beforeEach(() => {
    authStorageService = new AuthStorageService();
    authContextService = new AuthContextService(authStorageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('setToken method of AuthStorageService work as expected', () => {
    authContextService.setAuth({ token: 'abc' });
    expect(authStorageService.setToken).toHaveBeenCalled();
    expect(authStorageService.setToken).toHaveBeenCalledTimes(1);
    expect(authStorageService.setToken).toHaveBeenCalledWith('abc');
  });

  test('getToken method of AuthStorageService work as expected', () => {
    authStorageService.getToken = jest.fn(() => 'abc');
    expect(authStorageService.getToken).toHaveBeenCalled();
    expect(authStorageService.getToken).toHaveBeenCalledTimes(1);
    expect(authContextService.getAuth()).toEqual({ token: 'abc' });
  });

  test('setToken method of AuthStorageService work as expected', () => {
    authContextService.updateAuth({ token: 'abc' });
    expect(authStorageService.setToken).toHaveBeenCalled();
    expect(authStorageService.setToken).toHaveBeenCalledWith('abc');
    expect(authStorageService.setToken).toHaveBeenCalledTimes(1);
  });

  test('removeToken method of AuthStorageService work as expected', () => {
    authContextService.resetAuth();
    expect(authStorageService.removeToken).toHaveBeenCalled();
    expect(authStorageService.removeToken).toHaveBeenCalledTimes(1);
  });
});
