import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /** Set any JSON-serializable value to localStorage */
  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving ${key} to localStorage`, e);
    }
  }

  /** Get and parse a value from localStorage */
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) as T : null;
    } catch (e) {
      console.error(`Error parsing ${key} from localStorage`, e);
      return null;
    }
  }

  /** Remove item from localStorage */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /** Clear all localStorage (optional utility) */
  clear(): void {
    localStorage.clear();
  }
}
