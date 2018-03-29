import { Test, run } from 'beater';
import { tests as buildErrorTests } from './build-error';
import { tests as buildOptionsTests } from './build-options';
import { tests as getCurrentPositionTests } from './get-current-position';
import { tests as getOriginalTests } from './get-original';

const tests = ([] as Test[])
  .concat(buildErrorTests)
  .concat(buildOptionsTests)
  .concat(getCurrentPositionTests)
  .concat(getOriginalTests);

run(tests).catch(() => process.exit(1));
