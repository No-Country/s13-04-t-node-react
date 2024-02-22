export class CustomStorage {
  #listeners: (() => void)[] = [];

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, data: string) {
    localStorage.setItem(key, data);
    this.#notify();
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    this.#notify();
  }

  onChange(listener: () => void) {
    this.#listeners.push(listener);
  }

  getItemJSON(key: string) {
    const item = this.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItemJSON(key: string, data: unknown) {
    this.setItem(key, JSON.stringify(data));
  }

  #notify() {
    for (const listener of this.#listeners) {
      listener();
    }
  }
}
