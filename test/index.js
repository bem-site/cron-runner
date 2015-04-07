var inherit = require('inherit'),
    should = require('should'),
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

    describe('setIdle', function () {
        it('should switch state to IDLE state', function () {
            var cr = new CronRunner(options);

            cr._state = cr._STATE.ACTIVE;
            cr.isActive().should.equal(true);
            cr.setIdle().should.be.instanceOf(CronRunner);
            cr.isActive().should.equal(false);
        });
    });

    describe('setActive', function () {
        it('should switch state to ACTIVE state', function () {
            var cr = new CronRunner(options);

            cr.isActive().should.equal(false);
            cr.setActive().should.be.instanceOf(CronRunner);
            cr.isActive().should.equal(true);
        });
    });

    describe('isActive', function () {
        it('should return valid ACTIVE state', function () {
            var cr = new CronRunner(options);

            cr.isActive().should.be.instanceOf(Boolean);
            cr.isActive().should.equal(false);
            cr.setActive();
            cr.isActive().should.be.instanceOf(Boolean);
            cr.isActive().should.equal(true);
        });
    });

    describe('execute', function () {
        it ('should success', function () {
            var cr = new CronRunner(options);
            cr.execute().should.equal(true);
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

    describe('execute valid times', function () {
        var CR = inherit(CronRunner, {
            _count: 0,
            execute: function () { this._count += 1; }
        });

        it ('success', function (done) {
            var cr = new CR({
                cron: {
                    pattern: '*/1 * * * * *'
                }
            });
            cr.start();
            setTimeout(function () {
                cr.stop();
                cr._count.should.equal(4);
                done();
            }, 5000);
        });
    });

    describe('execute valid times with locking', function () {
        var CR = inherit(CronRunner, {
            _count: 0,

            execute: function () {
                if (this.isActive()) {
                    this._logger.warn('another execution process is being performed now');
                    return;
                }
                this.setActive();

                var _this = this;
                this._logger.warn('execute with locking');
                setTimeout(function () {
                    _this._count += 1;
                    return _this.setIdle();
                }, 2000)
            }
        });

        it ('success', function (done) {
            var cr = new CR({
                cron: {
                    pattern: '*/1 * * * * *'
                }
            });
            cr.start();
            setTimeout(function () {
                cr.stop();
                cr._count.should.equal(2);
                done();
            }, 5010);
        });
    });

    after(function () {});
});
