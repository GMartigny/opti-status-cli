const opti = require("opti-status");
const path = require("path");

const isFunction = fn => typeof fn === "function";

const functions = {};
process.argv
    .slice(2)
    .forEach((filePath) => {
        const result = {};
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const exports = require(path.resolve(filePath));
        if (isFunction(exports)) {
            result.default = opti(exports);
        }
        Object.keys(exports)
            .forEach((name) => {
                if (isFunction(exports[name])) {
                    result[name] = opti(exports[name]);
                }
            });
        if (Object.keys(result).length) {
            functions[filePath] = result;
        }
    });

process.send(functions);
