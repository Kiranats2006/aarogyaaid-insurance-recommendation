const { loadPolicies } = require("../services/rankingEngine");

function retrievePolicyChunks(query) {

    const policies = loadPolicies();

    const matches = [];

    for (let i = 0; i < policies.length; i++) {

        const policy = policies[i];

        if (
            query.toLowerCase().includes("waiting period")
        ) {

            matches.push({
                policy: policy.policyName,
                source: "waitingPeriodMonths",
                value: policy.waitingPeriodMonths
            });

        }

        if (
            query.toLowerCase().includes("co-pay")
        ) {

            matches.push({
                policy: policy.policyName,
                source: "copayPercent",
                value: policy.copayPercent
            });

        }

    }

    return matches;
}

module.exports = {
    retrievePolicyChunks
};