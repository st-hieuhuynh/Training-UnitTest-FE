import { AuthStorageService } from './authStorage.service';

export class AuthContextService {
  authStorageService;

  constructor(storageService: AuthStorageService) {
    this.authStorageService = storageService;
  }

  getAuth() {
    return { token: this.authStorageService.getToken() };
  }

  setAuth({ token }) {
    this.authStorageService.setToken(token);
  }

  updateAuth({ token }) {
    this.authStorageService.setToken(token);
  }

  resetAuth() {
    this.authStorageService.removeToken();
  }
}
