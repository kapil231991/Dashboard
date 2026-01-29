import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { CORE_PROVIDERS } from './app/core/core.providers';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { counterFeatureKey, counterReducer } from './app/state/counter/counter.reducer';
import { authorFeatureKey, authorReducer } from './app/state/author/author.reducer';
import { AuthorEffects } from './app/state/author/author.effects';
import { bookFeatureKey, bookReducer } from './app/state/book/book.reducer';
import { BookEffects } from './app/state/book/book.effects';


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    ...CORE_PROVIDERS,
    provideAnimations(),

    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),

    // 🔹 NgRx infrastructure
    provideStore({
      [counterFeatureKey]: counterReducer,
      [authorFeatureKey]: authorReducer,
      [bookFeatureKey]: bookReducer
    }),

    provideEffects([AuthorEffects, BookEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
});
