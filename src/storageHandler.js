export default {
  get(key, defaultValue = []) {
    if(this.exist(key)) {
      return JSON.parse(window.localStorage.getItem(key));
    } else {
      return defaultValue;
    }
  },
  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  add(key, value) {
    let currentValue;

    if(!this.exist(key)) {
      currentValue = [];
    } else {
      currentValue = this.get(key);
    }

    currentValue.push(value);
    this.set(key, currentValue);
  },
  remove(key) {
    window.localStorage.removeItem(key);
  },
  exist(key) {
    return window.localStorage.hasOwnProperty(key);
  }
}
