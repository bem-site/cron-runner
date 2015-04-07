var should = require('should'),
    CronRunner = require('../index.js');

describe('bem-data-source', function () {
    var options = {
        cron: {
            pattern: '0 */1 * * * *'
        }
    };

    before(function () {});

    describe('initialization', function () {
        it('should fail on initialization without options', function () {
            (function () { return new CronRunner(); }).should.throw('Options were not set');
        });

        it('should fail on initialization without cron options', function () {
            (function () { return new CronRunner({}); }).should.throw('Cron options were not set');
        });

        it('should fail on initialization without cron pattern option', function () {
            (function () { return new CronRunner({ cron: {} }); }).should.throw('Cron pattern was not set');
        });

        it ('should be initialized successfully', function () {
            var cr = new CronRunner(options);
            cr.should.be.ok;
            cr.should.have.property('_job');
            cr.should.have.property('_options');
            cr.should.have.property('_logger');

            cr._options.should.be.ok;
            cr._logger.should.be.ok;
            cr._job.should.be.ok;
        });
    });

    describe('start', function () {
        var cr;
        it('should success', function () {
            cr = new CronRunner(options);
            cr.start().should.be.ok;
        });

        it('should fail', function () {
            var cr1 = new CronRunner(options);
            cr1._job = undefined;
            (function () { return cr1.start(); }).should.throw('Cron job has\'t been initialized yet');
        });

        after(function () {
            cr.stop();
        });
    });

    describe('stop', function () {
        it('should success', function () {
            var cr = new CronRunner(options);
            cr.start().should.be.ok;
            cr.stop().should.be.ok;
        });

        it('should fail', function () {
            var cr = new CronRunner(options);
            cr._job = undefined;
            (function () { return cr.stop(); }).should.throw('Cron job has\'t been initialized yet');
        });
    });

    after(function () {});
});
