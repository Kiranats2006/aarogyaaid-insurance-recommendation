const { Runner } = require("@google/adk");

const {
    insuranceAgent
} = require("./insuranceAgent.mjs");

const runner = new Runner({
    agent: insuranceAgent
});

module.exports = {
    runner
};