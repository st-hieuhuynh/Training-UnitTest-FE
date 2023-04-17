import { AuthStorageService } from '../authStorage.service';
import { describe } from '@jest/globals';

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },
  };
})();

describe('test class AuthStorageService', () => {
    let authStorageService;
    beforeEach(() => {
      authStorageService = new AuthStorageService();
      Object.defineProperty(global, 'localStorage', { value: localStorageMock });
    });
    describe('check class AuthStorageService have correct prototype', () => {
      test('should be defined', () => {
        expect(authStorageService).toBeDefined();
      });
      test('should be an object', () => {
        expect(authStorageService).toBeInstanceOf(Object);
      });
      test('should have a method "setToken"', () => {
        expect(authStorageService.setToken).toBeDefined();
        authStorageService.setToken = jest.fn();
        authStorageService.setToken('abc');
        expect(authStorageService.setToken).toHaveBeenCalled();
      });
      test('should have a method "getToken"', () => {
        expect(authStorageService.getToken).toBeDefined();
        authStorageService.getToken = jest.fn();
        authStorageService.getToken();
        expect(authStorageService.getToken).toHaveBeenCalled();
      });
      test('should have a method "removeToken"', () => {
        expect(authStorageService.removeToken).toBeDefined();
        authStorageService.removeToken = jest.fn();
        authStorageService.removeToken();
        expect(authStorageService.removeToken).toHaveBeenCalled();
      });
    });

    describe('check localStorage call', () => {
      test('check setItem', () => {
        const spyOnLocalStorage = jest.spyOn(localStorage, 'setItem');
        authStorageService.setToken('abc');
        expect(spyOnLocalStorage).toHaveBeenCalledWith('token', 'abc');
      });
      test('check getItem', () => {
        const spyOnLocalStorage = jest.spyOn(localStorage, 'getItem');
        authStorageService.getToken();
        expect(spyOnLocalStorage).toHaveBeenCalled();
      });
      test('check removeItem', () => {
        const spyOnLocalStorage = jest.spyOn(localStorage, 'removeItem');
        authStorageService.removeToken('abc');
        expect(spyOnLocalStorage).toHaveBeenCalledWith('token');
      });
    });
});
