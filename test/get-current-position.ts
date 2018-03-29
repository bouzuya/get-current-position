import { Test, test } from 'beater';
import { fixture } from 'beater-helpers/fixture';
import assert from 'power-assert';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {
  getCurrentPosition as getCurrentPositionType
} from '../src/get-current-position';
import { PositionErrorPrime } from '../src/type/position-error';
import { StrictPositionOptionsPrime } from '../src/type/position-options';

interface Context {
  buildOptions: sinon.SinonStub;
  getCurrentPosition: typeof getCurrentPositionType;
  getOriginal: sinon.SinonStub;
}

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

const setUp = (): Context => {
  const buildOptions = sinon.stub();
  const getOriginal = sinon.stub();
  const getCurrentPosition: typeof getCurrentPositionType = proxyquire(
    '../src/get-current-position',
    {
      './build-options': { buildOptions },
      './get-original': { getOriginal }
    }
  ).getCurrentPosition;
  return {
    buildOptions,
    getCurrentPosition,
    getOriginal
  };
};

const tearDown = () => {
  // do nothing
};

const category = '/get-current-position ';
const tests: Test[] = [
  test(category + 'PositionNotSupportedError', fixture(setUp, tearDown,
    ({ buildOptions, getCurrentPosition, getOriginal }) => {
      buildOptions.returns(defaultOptions);
      getOriginal.returns(null);
      return getCurrentPosition().then(
        () => assert.fail(),
        (error: PositionErrorPrime) => {
          assert(buildOptions.callCount === 1);
          assert(getOriginal.callCount === 1);
          assert(error.type === 'not_supported');
          assert.deepEqual(error.options, defaultOptions);
        });
    })
  ),
  test(category + 'PositionPermissionDeniedError', fixture(setUp, tearDown,
    ({ buildOptions, getCurrentPosition, getOriginal }) => {
      // call failureCallback with PositionError.code = 1
      const original = sinon.stub().callsArgWith(1, { code: 1 });
      buildOptions.returns(defaultOptions);
      getOriginal.returns(original);
      return getCurrentPosition().then(
        () => assert.fail(),
        (error: PositionErrorPrime) => {
          assert(buildOptions.callCount === 1);
          assert(getOriginal.callCount === 1);
          assert(original.callCount === 1);
          assert(error.type === 'permission_denied');
          assert.deepEqual(error.options, defaultOptions);
        });
    })
  ),
  test(category + 'PositionPositionUnavailableError', fixture(setUp, tearDown,
    ({ buildOptions, getCurrentPosition, getOriginal }) => {
      // call failureCallback with PositionError.code = 2
      const original = sinon.stub().callsArgWith(1, { code: 2 });
      buildOptions.returns(defaultOptions);
      getOriginal.returns(original);
      return getCurrentPosition().then(
        () => assert.fail(),
        (error: PositionErrorPrime) => {
          assert(buildOptions.callCount === 1);
          assert(getOriginal.callCount === 1);
          assert(original.callCount === 1);
          assert(error.type === 'position_unavailable');
          assert.deepEqual(error.options, defaultOptions);
        });
    })
  ),
  test(category + 'PositionTimeoutError', fixture(setUp, tearDown,
    ({ buildOptions, getCurrentPosition, getOriginal }) => {
      // call failureCallback with PositionError.code = 3
      const original = sinon.stub().callsArgWith(1, { code: 3 });
      buildOptions.returns(defaultOptions);
      getOriginal.returns(original);
      return getCurrentPosition().then(
        () => assert.fail(),
        (error: PositionErrorPrime) => {
          assert(buildOptions.callCount === 1);
          assert(getOriginal.callCount === 1);
          assert(original.callCount === 1);
          assert(error.type === 'timeout');
          assert.deepEqual(error.options, defaultOptions);
        });
    })
  ),
  test(category + 'PositionUnknownError', fixture(setUp, tearDown,
    ({ buildOptions, getCurrentPosition, getOriginal }) => {
      // call failureCallback with unknown error
      const original = sinon.stub().callsArgWith(1, {});
      buildOptions.returns(defaultOptions);
      getOriginal.returns(original);
      return getCurrentPosition().then(
        () => assert.fail(),
        (error: PositionErrorPrime) => {
          assert(buildOptions.callCount === 1);
          assert(getOriginal.callCount === 1);
          assert(original.callCount === 1);
          assert(error.type === 'unknown');
          assert.deepEqual(error.options, defaultOptions);
        });
    })
  ),
  test(category + 'dummy', fixture(setUp, tearDown,
    ({ buildOptions, getCurrentPosition, getOriginal }) => {
      const original = sinon.stub().callsArgWith(0, {});
      buildOptions.returns(defaultOptions);
      getOriginal.returns(original);
      return getCurrentPosition().then(() => {
        assert(original.callCount === 1);
        assert(original.getCall(0).args.length === 3);
        assert(typeof original.getCall(0).args[0] === 'function');
        assert(typeof original.getCall(0).args[1] === 'function');
        assert.deepEqual(
          original.getCall(0).args[2],
          {
            enableHighAccuracy: defaultOptions.enableHighAccuracy,
            maximumAge: defaultOptions.maximumAge,
            timeout: defaultOptions.timeout
          }
        );
      });
    })
  )
];

export { tests };
