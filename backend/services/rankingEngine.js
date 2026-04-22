const fs = require("fs");
const path = require("path");

function loadPolicies() {

    const policyFiles = [
        "care-secure-plus.json",
        "shield-protect-gold.json",
        "family-health-basic.json"
    ];

    const policies = [];

    for (let i = 0; i < policyFiles.length; i++) {

        const filePath = path.join(
            __dirname,
            "../../policies",
            policyFiles[i]
        );

        const fileData = fs.readFileSync(filePath, "utf-8");

        policies.push(JSON.parse(fileData));
    }

    return policies;
}


function filterEligiblePolicies(userProfile) {

    const policies =
        loadPolicies();

    const eligible = [];


    for (let i = 0; i < policies.length; i++) {

        let policy =
            policies[i];


        if (
            userProfile.condition === "None"
        ) {

            eligible.push(
                policy
            );

        }


        else if (

            policy.conditionsCovered.includes(
                userProfile.condition
            )

        ) {

            eligible.push(
                policy
            );

        }

    }


    return eligible;

}

function rankPolicies(userProfile) {

    const policies = filterEligiblePolicies(userProfile);

    for (let i = 0; i < policies.length; i++) {

        let score = 0;

        score += 30;

        if (policies[i].waitingPeriodMonths <= 12) {
            score += 20;
        }

        if (userProfile.income === "under 3L") {

            if (policies[i].premium <= 15000) {
                score += 20;
            }

        }

        else if (userProfile.income === "3-8L") {
            if (policies[i].premium <= 20000) {
                score += 20;
            }
        }
        else {
            score += 15;
        }


        if (userProfile.age > 50 && policies[i].waitingPeriodMonths <= 12) {
            score += 15;
        }


        if (userProfile.lifestyle === "Active") {
            score += 10;
        }


        if (policies[i].networkTierSupport.includes(userProfile.city)) {
            score += 15;
        }


        policies[i].suitabilityScore = score;

    }
    policies.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

    return policies;
}


module.exports = {
    loadPolicies,
    filterEligiblePolicies,
    rankPolicies
};