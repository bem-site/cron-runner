var inherit = require('inherit'),
    CronJob = require('cron').CronJob;

module.exports = inherit({

    _job: undefined,
    _options: undefined,

    /**
     * Constructor function
     * @param {Object} options object.
     * (Should contain field 'cron' as object with fields:
     * - {String} pattern - cron pattern
     * - {Boolean} startImmediately - if true then cron will be started immediately
     * @private
     */
    __constructor: function (options) {
        this._options = options;

        if (!this._options) {
            throw new Error('Options were not set');
        }

        var o = this._options['cron'];
        if (!o) {
            throw new Error('Cron options were not set');
        }
        if (!o.pattern) {
            throw new Error('Cron pattern was not set');
        }

        o.startImmediately = o.startImmediately || false;
        this._job = new CronJob({
            cronTime: o.pattern,
            onTick: this.execute,
            start: o.startImmediately,
            context: this
        });
    },

    /**
     * Optional logging if debug options is set to true
     * @private
     */
    _log: function () {
        if (this._options.cron.debug) {
            console.log(arguments);
        }
    },

    /**
     * Method for cron script execution
     */
    execute: function () {
        console.log('execute');
    },

    /**
     * Starts cron execution
     * @returns {exports}
     */
    start: function () {
        if (!this._job) {
            throw new Error('Cron job has\'t been initialized yet');
        }

        this._log('Start cron job');
        this._job.start();
        return this;
    },

    /**
     * Stops cron execution
     * @returns {exports}
     */
    stop: function () {
        if (!this._job) {
            throw new Error('Cron job has\'t been initialized yet');
        }

        this._log('Stop cron job');
        this._job.stop();
        return this;
    }
});
