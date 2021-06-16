import EventEmitter from 'events';

class AuthManager {
  accessTokenKey = 'YUMMY_ACCESS_TOKEN';

  emitter = new EventEmitter();

  eventTypes = {
    LOGIN_STATUS_CHANGED: 'LOGIN_STATUS_CHANGED',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
  };

  isLoggedIn() {
    const token = this.getAccessToken();
    return !!token;
  }

  getAccessToken() {
    return localStorage.getItem(this.accessTokenKey);
  }

  login(token) {
    localStorage.setItem(this.accessTokenKey, token);

    this.emitter.emit(this.eventTypes.LOGIN_STATUS_CHANGED, true);
    this.emitter.emit(this.eventTypes.LOGIN);
  }

  logout() {
    localStorage.removeItem(this.accessTokenKey);

    this.emitter.emit(this.eventTypes.LOGIN_STATUS_CHANGED, false);
    this.emitter.emit(this.eventTypes.LOGOUT);
  }

  onLoginStatusChange(cb) {
    this.emitter.on(this.eventTypes.LOGIN_STATUS_CHANGED, cb);

    return () => {
      this.emitter.off(this.eventTypes.LOGIN_STATUS_CHANGED, cb);
    };
  }

  onLogin(cb) {
    this.emitter.on(this.eventTypes.LOGIN, cb);

    return () => {
      this.emitter.off(this.eventTypes.LOGIN, cb);
    };
  }

  onLogout(cb) {
    this.emitter.on(this.eventTypes.LOGOUT, cb);

    return () => {
      this.emitter.off(this.eventTypes.LOGOUT, cb);
    };
  }
}

export default new AuthManager();
