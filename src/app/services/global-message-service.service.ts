import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalMessageServiceService {
  private message = signal<string>('');
  private error = signal<boolean>(false);
  public getMessage = computed(() => this.message());
  public isError = computed(() => this.error());
  setMessage(message: string) {
    this.message.set(message);
    setTimeout(() => {
      this.message.set('');
    }, 2000);
  }
  setErrorMessage(message: string) {
    this.message.set(message);
    this.error.set(true);
    setTimeout(() => {
      this.message.set('');
      this.error.set(false);
    }, 2000);
  }
  constructor() {}
}
