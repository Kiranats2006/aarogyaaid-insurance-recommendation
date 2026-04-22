const { loadPolicies } = require("../services/rankingEngine");

async function retrievePolicyChunks(input) {

    const query = input.query.toLowerCase();

    const policies = loadPolicies();

    const results = [];

    for (let i = 0; i < policies.length; i++) {

        const policy = policies[i];

        if (query.includes("waiting period")) {

            results.push({
                policy: policy.policyName,
                clause: "waitingPeriodMonths",
                value: policy.waitingPeriodMonths
            });

        }

        if (query.includes("co-pay")) {

            results.push({
                policy: policy.policyName,
                clause: "copayPercent",
                value: policy.copayPercent
            });

        }

    }

    return results;
}

module.exports = {
    retrievePolicyChunks
};