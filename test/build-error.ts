import { Test, test } from 'beater';
import assert from 'power-assert';
import {
  buildNotSupportedError,
  buildPermissionDeniedError,
  buildPositionUnavailableError,
  buildTimeoutError,
  buildUnknownError
} from '../src/build-error';
import { StrictPositionOptions } from '../src/type/position-options';

const category = '/build-error ';
const tests: Test[] = [
  test(category + 'buildNotSupportedError', () => {
    const options = {} as StrictPositionOptions;
    const error = buildNotSupportedError(options);
    assert(error.options === options);
    assert(error.type === 'not_supported');
  }),
  test(category + 'buildPermissionDeniedError', () => {
    const options = {} as StrictPositionOptions;
    const error = buildPermissionDeniedError(options);
    assert(error.options === options);
    assert(error.type === 'permission_denied');
  }),
  test(category + 'buildPositionUnavailableError', () => {
    const options = {} as StrictPositionOptions;
    const error = buildPositionUnavailableError(options);
    assert(error.options === options);
    assert(error.type === 'position_unavailable');
  }),
  test(category + 'buildTimeoutError', () => {
    const options = {} as StrictPositionOptions;
    const error = buildTimeoutError(options);
    assert(error.options === options);
    assert(error.type === 'timeout');
  }),
  test(category + 'buildUnknownError', () => {
    const options = {} as StrictPositionOptions;
    const error = buildUnknownError(options);
    assert(error.options === options);
    assert(error.type === 'unknown');
  })
];

export { tests };
