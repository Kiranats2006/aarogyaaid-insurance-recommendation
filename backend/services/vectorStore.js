const { loadPolicies } = require("./rankingEngine");

function loadPolicyChunks() {
    const policies = loadPolicies();
    const chunks = [];

    for (let i = 0; i < policies.length; i++) {
        const policy = policies[i];

        chunks.push({
            policy: policy.policyName,
            text: "Waiting period is " + policy.waitingPeriodMonths + " months",
            keyword: "waiting period"
        });

        chunks.push({
            policy: policy.policyName,
            text: "Co-pay is " + policy.copayPercent + " percent",
            keyword: "co-pay"
        });
    }

    return chunks;
}

function searchChunks(query) {
    const chunks = loadPolicyChunks();
    const results = [];

    const text = query.toLowerCase();

    for (let i = 0; i < chunks.length; i++) {
        if (text.includes(chunks[i].keyword)) {
            results.push(chunks[i]);
        }
    }

    return results;
}

module.exports = {
    searchChunks
};