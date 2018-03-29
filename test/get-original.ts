import { Test, test } from 'beater';
import { fixture } from 'beater-helpers/fixture';
import assert from 'power-assert';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { getOriginal as getOriginalType } from '../src/get-original';

const category = '/get-original ';
const tests: Test[] = [
  test(category + 'no window', fixture(
    () => {
      const originalWindow = (global as any).window;
      delete (global as any).window;
      const { getOriginal }: { getOriginal: typeof getOriginalType; } =
        proxyquire('../src/get-original', {});
      return { getOriginal, originalWindow };
    }, ({ originalWindow }) => {
      (global as any).window = originalWindow;
    },
    ({ getOriginal }) => {
      assert(getOriginal() === null);
    })
  ),
  test(category + 'no navigator', fixture(
    () => {
      const originalWindow = (global as any).window;
      delete (global as any).window;
      (global as any).window = {
        navigator: void 0
      };
      const { getOriginal } = proxyquire('../src/get-original', {});
      return { getOriginal, originalWindow };
    }, ({ originalWindow }) => {
      (global as any).window = originalWindow;
    },
    ({ getOriginal }) => {
      assert(getOriginal() === null);
    })
  ),
  test(category + 'no geolocation', fixture(
    () => {
      const originalWindow = (global as any).window;
      delete (global as any).window;
      (global as any).window = {
        navigator: {
          geolocation: void 0
        }
      };
      const { getOriginal } = proxyquire('../src/get-original', {});
      return { getOriginal, originalWindow };
    }, ({ originalWindow }) => {
      (global as any).window = originalWindow;
    },
    ({ getOriginal }) => {
      assert(getOriginal() === null);
    })
  ),
  test(category + 'no getCurrentPosition', fixture(
    () => {
      const originalWindow = (global as any).window;
      delete (global as any).window;
      (global as any).window = {
        navigator: {
          geolocation: {
            getCurrentPosition: void 0
          }
        }
      };
      const { getOriginal } = proxyquire('../src/get-original', {});
      return { getOriginal, originalWindow };
    }, ({ originalWindow }) => {
      (global as any).window = originalWindow;
    },
    ({ getOriginal }) => {
      assert(getOriginal() === null);
    })
  )
  ,
  test(category + 'no getCurrentPosition', () => {
    // fixture can't use for `global`.
    const getCurrentPosition = sinon.stub();
    const originalWindow = (global as any).window;
    delete (global as any).window;
    (global as any).window = {
      navigator: {
        geolocation: {
          getCurrentPosition
        }
      }
    };
    const { getOriginal } = proxyquire('../src/get-original', {});
    assert(getOriginal() === getCurrentPosition);
    (global as any).window = originalWindow;
  })
];

export { tests };
