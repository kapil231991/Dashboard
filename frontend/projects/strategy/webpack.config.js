const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

    name: 'strategy',

    exposes: {
        './Routes': './projects/strategy/src/app/app.routes.ts',
    },
    shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },

        '@ngrx/store': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@ngrx/effects': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@ngrx/store-devtools': { singleton: true, strictVersion: true, requiredVersion: 'auto' },

        // you can still share the rest generically if you want
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    },

});
