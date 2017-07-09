/* global require */

var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            // https://github.com/ariya/phantomjs/issues/12401
            './node_modules/promise-polyfill/promise.js',
            'web/test/**/*.test.js',
            'web/components/**/*.test.js'
        ],
        exclude: [],
        preprocessors: {
            'web/**/*.js': ['webpack']
        },
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    })
};
