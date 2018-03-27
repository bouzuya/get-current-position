import { Test, run } from 'beater';
import { tests as addTests } from './add';
import { tests as getCurrentPositionTests } from './get-current-position';

const tests = ([] as Test[])
  .concat(addTests)
  .concat(getCurrentPositionTests);

run(tests).catch(() => process.exit(1));
