import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'claims',
  exposes: {
    './Routes': 'mfe-claims/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
