import { Test, test } from 'beater';
import assert from 'power-assert';
import sinon from 'sinon';
import { getOriginal } from '../src/get-original';

const category = '/get-original ';
const tests: Test[] = [
  test(category + 'no window', () => {
    delete (global as any).window;
    assert(getOriginal() === null);
  }),
  test(category + 'no navigator', () => {
    (global as any).window = {
      navigator: void 0
    };
    assert(getOriginal() === null);
  }),
  test(category + 'no geolocation', () => {
    (global as any).window = {
      navigator: {
        geolocation: void 0
      }
    };
    assert(getOriginal() === null);
  }),
  test(category + 'no getCurrentPosition', () => {
    (global as any).window = {
      navigator: {
        geolocation: {
          getCurrentPosition: void 0
        }
      }
    };
    assert(getOriginal() === null);
  }),
  test(category + 'getCurrentPosition', () => {
    const bound = sinon.stub();
    const geolocation = {
      getCurrentPosition: {
        bind: sinon.stub().returns(bound)
      }
    };
    (global as any).window = {
      navigator: {
        geolocation
      }
    };
    const original = getOriginal();
    assert(original === bound);
    assert(geolocation.getCurrentPosition.bind.callCount === 1);
    assert.deepEqual(
      geolocation.getCurrentPosition.bind.getCall(0).args,
      [geolocation]
    );
  })
];

export { tests };
