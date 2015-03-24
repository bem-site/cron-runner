# cron-runner
Custom code execution periodically

[![NPM](https://nodei.co/npm/cron-runner.png)](https://nodei.co/npm/cron-runner/)

[![Coveralls branch](https://img.shields.io/coveralls/bem-site/cron-runner/master.svg)](https://coveralls.io/r/bem-site/cron-runner?branch=master)
[![Travis](https://img.shields.io/travis/bem-site/cron-runner.svg)](https://travis-ci.org/bem-site/cron-runner)
[![David](https://img.shields.io/david/bem-site/cron-runner.svg)](https://david-dm.org/bem-site/cron-runner)
[![David](https://img.shields.io/david/dev/bem-site/cron-runner.svg)](https://david-dm.org/bem-site/cron-runner#info=devDependencies)


## Usage

You should inherit from given module with help of [inherit](https://www.npmjs.com/package/inherit)

```
var inherit = require('inherit'),
    CronRunner = require('cron-runner');

var MyCronRunner = inherit(CronRunner, {
    __constructor: function (options) {
        this.__base(options);
        //TODO implement your custom initialization code here
    },

    execute: function () {
        //TODO implement your custom execution code here
    }
});

var mcr = new MyCronRunner({
    cron: {
        pattern: '0 */1 * * * *'
    }
});

mcr.start();
```

## Testing

Run tests:
```
npm run mocha
```

Run tests with istanbul coverage calculation:
```
npm run istanbul
```

Run codestyle verification (jshint and jscs)
```
npm run codestyle
```

Maintainer @tormozz48
Please send your questions and proposals to: tormozz48@gmail.com
