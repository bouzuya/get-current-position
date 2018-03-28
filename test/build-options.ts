import { Test, test } from 'beater';
import assert from 'power-assert';
import { NewPositionOptions, buildOptions } from '../src/build-options';

const category = '/build-options ';
const tests: Test[] = [
  test(category + 'undefined', () => {
    const options: NewPositionOptions = {
      ...{
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      },
      accuracyOptions: {
        maximumAccuracy: Infinity,
        minimumTimestamp: 0
      },
      maximumRetryCount: 0,
      retryArguments: []
    };
    assert.deepEqual(buildOptions(), options);
  })
];

export { tests };
