import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'mfe-reference-data',
  exposes: {
    './Routes': 'mfe-reference-data/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
