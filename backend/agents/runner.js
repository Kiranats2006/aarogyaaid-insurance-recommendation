const { Runner } = require("@google/adk");

async function getRunner() {
    const agentModule = await import("./insuranceAgent.mjs");

    const runner = new Runner({
        agent: agentModule.default
    });

    return runner;
}

module.exports = {
    getRunner
};