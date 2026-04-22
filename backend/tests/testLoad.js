const { rankPolicies } = require("../services/rankingEngine");

const userProfile = {
    condition: "Diabetes",
    city: "Tier-2"
};

console.log(
    rankPolicies(userProfile)
);