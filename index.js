var inherit = require('inherit'),
    Logger = require('bem-site-logger'),
    CronJob = require('cron').CronJob;

module.exports = inherit({

    _job: undefined,
    _options: undefined,
    _logger: undefined,

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
        this._logger = Logger.createLogger(module);

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
     * Method for cron script execution
     */
    execute: function () {
        this._logger.info('cron runner start execution');
    },

    /**
     * Starts cron execution
     * @returns {exports}
     */
    start: function () {
        if (!this._job) {
            var error = new Error('Cron job has\'t been initialized yet');
            this._logger.error(error.message);
            throw error;
        }

        this._logger.info('Start cron job');
        this._job.start();
        return this;
    },

    /**
     * Stops cron execution
     * @returns {exports}
     */
    stop: function () {
        if (!this._job) {
            var error = new Error('Cron job has\'t been initialized yet');
            this._logger.error(error.message);
            throw error;
        }

        this._logger.info('Stop cron job');
        this._job.stop();
        return this;
    }
});
