import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfe-shell',
  remotes: ['mfe-claims', 'mfe-reference-data'],
};

export default config;
