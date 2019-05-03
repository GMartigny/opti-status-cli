#!/usr/bin/env node
const execa = require("execa");
const meow = require("meow");
const chalk = require("chalk");
const { statuses } = require("opti");

const cli = meow(`The file passed as argument should export a function.
    Usage
        $ opti <file>
    
    Example
        $ opti function.js
`);

const run = async (fileList) => {
    if (!fileList.length) {
        cli.showHelp(1);
    }

    const result = JSON.parse(await execa.stdout(
        "node",
        [
            "--allow-natives-syntax",
            "exe.js",
            ...fileList,
        ],
    ));
    // eslint-disable-next-line no-bitwise
    const success = statuses.isOptimized & result.status;
    console.log(`> ${chalk[success ? "green" : "red"](result.message)} ${success ? "(èᴗé)و" : "(╯°□°)╯"}`);
};

run(cli.input);
