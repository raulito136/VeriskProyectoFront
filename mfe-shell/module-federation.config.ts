import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfe-shell',
  remotes: ['claims', 'mfe-reference-data'],
};

export default config;
