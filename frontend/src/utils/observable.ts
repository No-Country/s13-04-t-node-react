type Observer<T> = (data: T) => void;

export class Observable<T> {
  #observers: Observer<T>[] = [];

  subscribe(observer: Observer<T>) {
    this.#observers.push(observer);
  }

  unsubscribe(observer: Observer<T>) {
    const index = this.#observers.indexOf(observer);
    if (index !== -1) {
      this.#observers.splice(index, 1);
    }
  }

  notify(data: T): void {
    for (const observer of this.#observers) {
      observer(data);
    }
  }
}
