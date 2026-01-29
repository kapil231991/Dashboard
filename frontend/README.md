# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.




📘 Project Notes – What We’ve Built & Learned So Far

This project has evolved into a real-world Angular architecture playground. Here’s a clean summary of what you’ve implemented and understood till now:

🔐 Authentication Layer

Implemented JWT-based login using backend API.

AuthService uses Angular Signals to manage:

token

username

firstName, lastName

Added:

isLoggedIn as a computed signal

fullName as a derived computed

effect() to persist token automatically in localStorage

restoreFromStorage() restores session after refresh.

Header shows logged-in user name reactively.

Logout clears signals + storage.

👉 You now have a reactive auth state without RxJS boilerplate.

🧭 Routing & Guards

Application uses Standalone APIs (Angular 20 style).

Lazy-loaded modules:

author, book, user, todo, dashboard

authGuard protects all internal routes.

NotFound page handles unknown routes.

Main layout contains:

Left menu

Right user dropdown with logout

🧩 Micro Frontend (Module Federation)

Converted monolith into Host + Remote (Accounts).

Host:

Uses loadRemoteModule in routing.

Loads ACCOUNTS_ROUTES from remote.

Remote (Accounts):

Exposes ./Routes via webpack config.

Both apps run independently.

Accounts is now a true MFE plugged into host.

You now understand:

webpack.config.js changes

remoteEntry.js

Exposing routes

Lazy loading remote modules

🧠 Signals (Angular Core)

You implemented Signals in two domains:

Auth

signal() → source of truth

computed() → derived values

effect() → side-effects (persist token)

Todo

Central TodoService using:

_todos = signal<Todo[]>([])

openTodos, doneTodos as computed

effect() to log changes

You learned:

Concept	Role
signal	Holds reactive state
computed	Derives from other signals
effect	Reacts to any dependency change
🏗️ Author CRUD (Without State)

Built:

Author List

Add Author form

Integrated API:

GET /api/authors

POST /api/authors

Implemented:

Reactive forms

Validation

Routing between list/add

Fixed CORS & Spring Security issues.

This gave you a baseline CRUD without state management.

🧱 NgRx Integration (State Layer)

You introduced NgRx in a modern Angular way:

In bootstrapApplication:

provideStore({
  [counterFeatureKey]: counterReducer,
  [authorFeatureKey]: authorReducer
}),
provideEffects([AuthorEffects]),
provideStoreDevtools(),


For Author:

Actions:

loadAuthors

addAuthor

deleteAuthor

Reducer:

Manages { authors, loading, error }

Selectors:

selectAuthors

selectLoading

Effects:

Calls API via AuthorService

Dispatches success/failure

Now:

API is called once.

State is cached centrally.

Any screen (Book, Dashboard, etc.) can reuse the same Author data.

Adding an author updates everywhere without refetching.

You clearly understood:

NgRx = Structured, predictable, app-wide state
Signals = Local reactive state
Services/Observables = Imperative data flow

NgRx solves cross-feature consistency & orchestration.

📚 Book Feature (In Progress)

Designed:

Book model

Add Book page

List Book page

Integrated:

Author dropdown on Add Book

Started NgRx for Book:

Actions created

Effects wired

You hit and solved:

unknown type errors → fixed by typing API responses:

create(book: Book): Observable<Book>


This reinforced:

NgRx forces you to be explicit and safe at every boundary.

You are now working like an architect, not just a developer:

You understand why each layer exists.

You can compare:

Service-based state vs Signals vs NgRx

You are building:

A scalable dashboard

With microfrontends

With reactive state

With clean domain separation

This foundation is exactly what modern enterprise Angular systems look like.