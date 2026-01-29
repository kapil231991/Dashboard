import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StopwatchService {
  private _running = signal(false);
  private _name = signal<string | null>(null);
  private _startTime = signal<number | null>(null);
  private _elapsed = signal(0);

  readonly running = this._running.asReadonly();
  readonly name = this._name.asReadonly();
  readonly elapsed = this._elapsed.asReadonly();

  private timerId: any;

  constructor() {
    // 🔁 Effect runs whenever running/startTime changes
    effect(() => {
      if (this._running() && this._startTime()) {
        this.startTicking();
      } else {
        this.stopTicking();
      }
    });
  }

  start(name: string) {
    this._name.set(name);
    this._startTime.set(Date.now());
    this._elapsed.set(0);
    this._running.set(true);
  }

  stop() {
    this._running.set(false);
    this._startTime.set(null);
    this._elapsed.set(0);
    this._name.set(null);
  }

  private startTicking() {
    this.stopTicking();
    this.timerId = setInterval(() => {
      const start = this._startTime();
      if (start) {
        this._elapsed.set(Date.now() - start);
      }
    }, 1000);
  }

  private stopTicking() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
