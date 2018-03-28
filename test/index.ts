import { Test, run } from 'beater';
import { tests as addTests } from './add';
import { tests as buildOptionsTests } from './build-options';
import { tests as getCurrentPositionTests } from './get-current-position';

const tests = ([] as Test[])
  .concat(addTests)
  .concat(buildOptionsTests)
  .concat(getCurrentPositionTests);

run(tests).catch(() => process.exit(1));
