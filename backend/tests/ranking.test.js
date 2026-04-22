const assert = require("assert");

const {rankPolicies} = require("../services/rankingEngine");

const userProfile = {
    fullName: "Kirana",
    age: 55,
    lifestyle: "Active",
    condition: "Diabetes",
    income: "3-8L",
    city: "Tier-2"
};


const rankedPolicies = rankPolicies(userProfile);

assert.strictEqual(rankedPolicies[0].policyName, "Care Secure Plus");


console.log("Test passed");