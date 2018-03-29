# get-current-position

`navigator.geolocation.getCurrentPosition` wrapper.

## Installation

```
$ npm install @bouzuya/get-current-position
```

## Usage

```
import { getCurrentPosition } from '@bouzuya/get-current-position';

const main = async () => {
  const position1 = await getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });
  // {
  //   coords: {
  //     accuracy: 30,
  //     altitude: 0,
  //     altitudeAccuracy: 0,
  //     heading: NaN,
  //     latitude: 34.694372,
  //     longitude: 135.201863,
  //     speed: NaN
  //   },
  //   timestamp: 1522119771324
  // }
  console.log(position1);

  // retry & accuracy options
  const position2 = await getCurrentPosition({
    ...{
      enableHighAccuracy: false,
      timeout: 100,
      maximumAge: Infinity
    },
    accuracyOptions: {
      maximumAccuracy: 500,
      minimumTimestamp: new Date().getTime() - 300000
    },
    maximumRetryCount: 3,
    retryArguments: [
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    ]
  });
  console.log(position2);
};

main();
```

## Badges

[![npm version][npm-badge-url]][npm-url]
[![Travis CI][travisci-badge-url]][travisci-url]

[npm-badge-url]: https://img.shields.io/npm/v/@bouzuya/get-current-position.svg
[npm-url]: https://www.npmjs.com/package/@bouzuya/get-current-position
[travisci-badge-url]: https://img.shields.io/travis/bouzuya/get-current-position.svg
[travisci-url]: https://travis-ci.org/bouzuya/get-current-position

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
