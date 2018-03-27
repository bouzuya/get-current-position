import { Test, test } from 'beater';
import assert from 'power-assert';
import { getCurrentPosition } from '../src/get-current-position';

const category = '/get-current-position ';
const tests: Test[] = [
  test(category + 'function', () => {
    assert(typeof getCurrentPosition === 'function');
  })
];

export { tests };
