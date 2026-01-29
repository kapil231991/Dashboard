import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import * as CounterActions from '../../../../state/counter/counter.action';
import { selectCounter } from '../../../../state/counter/counter.selector';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-counter-component',
  imports: [FormsModule],
  templateUrl: './counter-component.html',
  styleUrl: './counter-component.css',
})
export class CounterComponent {
  private store = inject(Store);

  counter = toSignal(
    this.store.select(selectCounter),
    { initialValue: 0 }
  );

  inc() { 
    this.store.dispatch(CounterActions.increment());
    console.log('Incremented', this.counter()); 
  }
  dec() { this.store.dispatch(CounterActions.decrement()); }
  reset() { this.store.dispatch(CounterActions.reset()); }
}
