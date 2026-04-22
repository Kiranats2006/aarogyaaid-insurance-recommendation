const express = require("express");
const router = express.Router();

const { rankPolicies } = require("../services/rankingEngine");
const { generatePolicyExplanation } = require("../agents/explainPolicy");

router.post("/", async (req, res) => {

    const userProfile = req.body;

    const rankedPolicies = rankPolicies(userProfile);

    if (rankedPolicies.length === 0) {
        return res.json({
            message: "No suitable policies found"
        });
    }

    const bestPolicy = rankedPolicies[0];

    let explanation =
        `${bestPolicy.policyName} is recommended based on your profile.`;

    try {

        explanation =
            await generatePolicyExplanation(
                userProfile,
                bestPolicy
            );

    } catch (error) {

        console.log(
            "ADK explanation fallback used."
        );

    }

    res.json({

        peerComparison: rankedPolicies,

        coverageDetails: {
            inclusions: bestPolicy.inclusions,
            exclusions: bestPolicy.exclusions,
            subLimits: bestPolicy.subLimits,
            copayPercent: bestPolicy.copayPercent,
            claimType: bestPolicy.claimType
        },

        whyThisPolicy: explanation

    });

});

module.exports = router;