const opti = require("opti");
const path = require("path");

const imports = process.argv.slice(2).map(filePath => require(path.resolve(filePath)));
const result = opti(...imports);

console.log(JSON.stringify(result));
