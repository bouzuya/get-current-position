import { Test, test } from 'beater';
import assert from 'power-assert';
import { buildNotSupportedError } from '../src/build-error';
import { StrictPositionOptions } from '../src/type/position-options';

const category = '/build-error ';
const tests: Test[] = [
  test(category, () => {
    const options = {} as StrictPositionOptions;
    const error = buildNotSupportedError(options);
    assert(error.options === options);
    assert(error.type === 'not_supported');
  })
];

export { tests };
