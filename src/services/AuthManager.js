class AuthManager {
  tokenKey = 'YUMMY_TOKEN';

  subscribers = [];

  isLoggedIn() {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  login(token) {
    localStorage.setItem(this.tokenKey, token);
    this.notifySubscribers(token);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.notifySubscribers(null);
  }

  subscribe(cb) {
    this.subscribers.push(cb);
  }

  unsubscribe(cb) {
    this.subscribers = this.subscribers.filter((sub) => sub !== cb);
  }

  notifySubscribers(data) {
    this.subscribers.forEach((cb) => cb(data));
  }
}

export default new AuthManager();
