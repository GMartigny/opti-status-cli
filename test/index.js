const test = require("ava");
const execa = require("execa");

test("show help", async (t) => {
    try {
        await execa("./src/cli");
    }
    catch ({ stdout, exitCode }) {
        t.is(exitCode, 2);
        t.snapshot(stdout, "Help");
    }
});

test("multiple files", async (t) => {
    const fixturesPath = "./test/fixtures/";
    const { stdout } = await execa("./src/cli", [`${fixturesPath}named.js`, `${fixturesPath}unique.js`]);
    t.snapshot(stdout, "Result");
});
