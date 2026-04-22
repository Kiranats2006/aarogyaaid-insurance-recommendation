const express = require("express");
const router = express.Router();

const { rankPolicies } = require("../services/rankingEngine");

router.post("/", (req, res) => {

    const userProfile = req.body;

    const rankedPolicies = rankPolicies(userProfile);

    if (rankedPolicies.length === 0) {

        return res.json({
            message: "No suitable policies found"
        });

    }

    const bestPolicy = rankedPolicies[0];

    const response = {

        peerComparison: rankedPolicies,

        coverageDetails: {
            inclusions: bestPolicy.inclusions,
            exclusions: bestPolicy.exclusions,
            subLimits: bestPolicy.subLimits,
            copayPercent: bestPolicy.copayPercent,
            claimType: bestPolicy.claimType
        },

        whyThisPolicy:
            `${bestPolicy.policyName} is recommended because it matches your condition, has a suitable waiting period, and fits your city network needs.`

    };

    res.json(response);

});

module.exports = router;