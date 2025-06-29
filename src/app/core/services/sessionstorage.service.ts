import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  /** Store any JSON-serializable value in sessionStorage */
  setItem<T>(key: string, value: T): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving ${key} to sessionStorage`, e);
    }
  }

  /** Retrieve a value from sessionStorage and parse it */
  getItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    try {
      return item ? JSON.parse(item) as T : null;
    } catch (e) {
      console.error(`Error parsing ${key} from sessionStorage`, e);
      return null;
    }
  }

  /** Remove a specific item */
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  /** Clear all session storage (optional utility) */
  clear(): void {
    sessionStorage.clear();
  }
}
