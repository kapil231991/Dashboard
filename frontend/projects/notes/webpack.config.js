const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

    name: 'notes',

    exposes: {
        './Routes': './projects/notes/src/app/notes.routes.ts',
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
