import { Test, test } from 'beater';
import { fixture } from 'beater-helpers/fixture';
import assert from 'power-assert';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {
  getCurrentPosition as getCurrentPositionType
} from '../src/get-current-position';
import { PositionNotSupportedError } from '../src/type/position-error';
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
      getOriginal.returns(null);
      return getCurrentPosition().then(
        () => assert.fail(),
        (error: PositionNotSupportedError) => {
          assert(buildOptions.callCount === 1);
          assert(getOriginal.callCount === 1);
          assert(error.type === 'not_supported');
          assert.deepEqual(error.options, defaultOptions);
        });
    })
  )
];

export { tests };
