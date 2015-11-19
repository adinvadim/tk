var intel = require('intel');
var path = require('path')
intel.console();

intel.config({
    formatters: {
        'simple': {
            'format': '[%(levelname)s] %(message)s',
            'colorize': true
        },
        'details': {
            'format': '[%(date)s] %(name)s.%(levelname)s: %(message)s',
            'strip': true
        }
    },
    handlers: {
        'terminal': {
            'class': intel.handlers.Console,
            'formatter': 'simple',
            'level': intel.VERBOSE
        },
        'logfile': {
            'class': intel.handlers.File,
            'level': intel.WARN,
            'file': path.resolve(__dirname, '../logs/report.log'),
            'formatter': 'details'
        }
    },
    loggers: {
        'patrol': {
            'handlers': ['terminal'],
            'level': 'INFO',
            'handleExceptions': true,
            'exitOnError': false,
            'propagate': false
        },
        'patrol.node_modules.express': {
            'handlers': ['terminal'],
        }
    }

});

module.exports = intel;
