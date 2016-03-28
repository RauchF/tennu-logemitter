const format = require("util").format;
const EventEmitter = require("after-events");

var LogEmitter = {
    init: function (client, imports) {
        const actualLogger = client._logger;
        const emitter = Object.create(EventEmitter());

        var log = function (level) {
            return function () {
                // Emit the event
                emitter.emit(level.toLowerCase(), arguments);
                emitter.emit('*', arguments);

                // Call the actual logger
                switch (arguments.length) {
                    case 0:
                        actualLogger[level]();
                        break;
                    case 1:
                        actualLogger[level](arguments[0]);
                        break;
                    case 2:
                        actualLogger[level](arguments[0], arguments[1]);
                        break;
                    case 3:
                        actualLogger[level](arguments[0], arguments[1], arguments[2]);
                        break;
                    default:
                        throw Error(format("Cannot call logger with %s arguments (maximum is 3).", arguments.length));
                }
            };
        };

        client._logger = {
            debug: log("debug"),
            info: log("info"),
            notice: log("notice"),
            warn: log("warn"),
            error: log("error"),
            crit: log("crit"),
            alert: log("alert"),
            emerg: log("emerg")
        }

        return {
            subscribe: {
                prefix: 'logemitter:',
                emitter: emitter
            }
        }
    }
}

module.exports = LogEmitter;