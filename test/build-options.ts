import { Test, test } from 'beater';
import assert from 'power-assert';
import { buildOptions } from '../src/build-options';
import { StrictPositionOptionsPrime } from '../src/type/position-options';

const defaultOptions: StrictPositionOptionsPrime = {
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
const category = '/build-options ';
const tests: Test[] = [
  test(category + 'undefined', () => {
    assert.deepEqual(buildOptions(), defaultOptions);
  }),
  test(category + '{}', () => {
    assert.deepEqual(buildOptions({}), defaultOptions);
  }),
  test(category + '{ enableHighAccuracy: true }', () => {
    assert.deepEqual(
      buildOptions({ enableHighAccuracy: true }),
      {
        ...defaultOptions,
        ...{
          enableHighAccuracy: true
        }
      }
    );
  }),
  test(category + '{ enableHighAccuracy: true, retryArguments: ... }', () => {
    assert.deepEqual(
      buildOptions({ enableHighAccuracy: true, retryArguments: [{}] }),
      {
        ...defaultOptions,
        ...{
          enableHighAccuracy: true
        },
        retryArguments: [
          {
            enableHighAccuracy: true,
            maximumAge: defaultOptions.maximumAge,
            timeout: defaultOptions.timeout
          }
        ]
      }
    );
  }),
  test(category + '{ maximumAge: 1, retryArguments: ... }', () => {
    assert.deepEqual(
      buildOptions({ maximumAge: 1, retryArguments: [{}] }),
      {
        ...defaultOptions,
        ...{
          maximumAge: 1
        },
        retryArguments: [
          {
            enableHighAccuracy: defaultOptions.enableHighAccuracy,
            maximumAge: 1,
            timeout: defaultOptions.timeout
          }
        ]
      }
    );
  }),
  test(category + '{ maximumAge: 1, retryArguments: ... }', () => {
    assert.deepEqual(
      buildOptions({ maximumAge: 1, retryArguments: [{}] }),
      {
        ...defaultOptions,
        ...{
          maximumAge: 1
        },
        retryArguments: [
          {
            enableHighAccuracy: defaultOptions.enableHighAccuracy,
            maximumAge: 1,
            timeout: defaultOptions.timeout
          }
        ]
      }
    );
  }),
  test(category + '{ timeout: 1, retryArguments: ... }', () => {
    assert.deepEqual(
      buildOptions({ timeout: 1, retryArguments: [{}] }),
      {
        ...defaultOptions,
        ...{
          timeout: 1
        },
        retryArguments: [
          {
            enableHighAccuracy: defaultOptions.enableHighAccuracy,
            maximumAge: defaultOptions.maximumAge,
            timeout: 1
          }
        ]
      }
    );
  }),
  test(category + '{ accuracyOptions: {} }', () => {
    assert.deepEqual(
      buildOptions({ accuracyOptions: {} }),
      defaultOptions
    );
  }),
  test(category + '{ accuracyOptions: { maximumAccuracy: 1 } }', () => {
    assert.deepEqual(
      buildOptions({ accuracyOptions: { maximumAccuracy: 1 } }),
      {
        ...defaultOptions,
        accuracyOptions: {
          maximumAccuracy: 1,
          minimumTimestamp: 0
        }
      }
    );
  }),
  test(category + '{ accuracyOptions: { minimumTimestamp: 1 } }', () => {
    assert.deepEqual(
      buildOptions({ accuracyOptions: { minimumTimestamp: 1 } }),
      {
        ...defaultOptions,
        accuracyOptions: {
          maximumAccuracy: Infinity,
          minimumTimestamp: 1
        }
      }
    );
  }),
  test(category + '{ maximumRetryCount: 1 } }', () => {
    assert.deepEqual(
      buildOptions({ maximumRetryCount: 1 }),
      {
        ...defaultOptions,
        maximumRetryCount: 1
      }
    );
  }),
  test(category + '{ retryArguments: [{ enableHighAccuracy: true }] } }', () => {
    assert.deepEqual(
      buildOptions({ retryArguments: [{ enableHighAccuracy: true }] }),
      {
        ...defaultOptions,
        retryArguments: [
          {
            enableHighAccuracy: true,
            maximumAge: defaultOptions.maximumAge,
            timeout: defaultOptions.timeout
          }
        ]
      }
    );
  }),
  test(category + '{ retryArguments: [{ enableHighAccuracy: true }, {}] } }', () => {
    assert.deepEqual(
      buildOptions({ retryArguments: [{ enableHighAccuracy: true }, {}] }),
      {
        ...defaultOptions,
        retryArguments: [
          {
            enableHighAccuracy: true,
            maximumAge: defaultOptions.maximumAge,
            timeout: defaultOptions.timeout
          },
          {
            enableHighAccuracy: true,
            maximumAge: defaultOptions.maximumAge,
            timeout: defaultOptions.timeout
          }
        ]
      }
    );
  }),
  test(category + '{ retryArguments: [{ maximumAge: 1 }, {}] } }', () => {
    assert.deepEqual(
      buildOptions({ retryArguments: [{ maximumAge: 1 }, {}] }),
      {
        ...defaultOptions,
        retryArguments: [
          {
            enableHighAccuracy: defaultOptions.enableHighAccuracy,
            maximumAge: 1,
            timeout: defaultOptions.timeout
          },
          {
            enableHighAccuracy: defaultOptions.enableHighAccuracy,
            maximumAge: 1,
            timeout: defaultOptions.timeout
          }
        ]
      }
    );
  }),
  test(category + '{ retryArguments: [{ timeout: 1 }, {}] } }', () => {
    assert.deepEqual(
      buildOptions({ retryArguments: [{ timeout: 1 }, {}] }),
      {
        ...defaultOptions,
        retryArguments: [
          {
            enableHighAccuracy: defaultOptions.enableHighAccuracy,
            maximumAge: defaultOptions.maximumAge,
            timeout: 1
          },
          {
            enableHighAccuracy: defaultOptions.enableHighAccuracy,
            maximumAge: defaultOptions.maximumAge,
            timeout: 1
          }
        ]
      }
    );
  }),
  test(category + '{ timeout: 1, retryArguments: [{}, { timeout: 2 }, {}] } }', () => {
    assert.deepEqual(
      buildOptions({
        ...{ timeout: 1 },
        retryArguments: [{}, { timeout: 2 }, {}]
      }),
      {
        ...defaultOptions,
        ...{ timeout: 1 },
        retryArguments: [
          {
            enableHighAccuracy: defaultOptions.enableHighAccuracy,
            maximumAge: defaultOptions.maximumAge,
            timeout: 1
          },
          {
            enableHighAccuracy: defaultOptions.enableHighAccuracy,
            maximumAge: defaultOptions.maximumAge,
            timeout: 2
          },
          {
            enableHighAccuracy: defaultOptions.enableHighAccuracy,
            maximumAge: defaultOptions.maximumAge,
            timeout: 2
          }
        ]
      }
    );
  })
];

export { tests };
