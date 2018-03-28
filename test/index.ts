import { Test, run } from 'beater';
import { tests as buildErrorTests } from './build-error';
import { tests as buildOptionsTests } from './build-options';
import { tests as getCurrentPositionTests } from './get-current-position';

const tests = ([] as Test[])
  .concat(buildErrorTests)
  .concat(buildOptionsTests)
  .concat(getCurrentPositionTests);

run(tests).catch(() => process.exit(1));
