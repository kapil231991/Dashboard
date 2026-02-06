const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

    name: 'todo',

    exposes: {
        './Routes': './projects/todo/src/app/features/todo/todo.routes.ts',
    },

    shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@ngrx/store': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@ngrx/effects': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@ngrx/store-devtools': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    },

});
