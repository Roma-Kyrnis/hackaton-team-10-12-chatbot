import { runAllConnectors } from './connectors';

const boot = async () => {
  await runAllConnectors();
};

boot();
