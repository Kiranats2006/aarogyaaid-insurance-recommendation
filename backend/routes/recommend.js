const express = require("express");
const router = express.Router();

const { rankPolicies } = require("../services/rankingEngine");
const { generatePolicyExplanation } = require("../agents/explainPolicy");
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {

    const userProfile = req.body;

    const rankedPolicies = rankPolicies(userProfile);

    if (rankedPolicies.length === 0) {
        return res.json({
            message: "No suitable policies found"
        });
    }

    const bestPolicy = rankedPolicies[0];

    Profile.create({
        fullName: userProfile.fullName,
        age: userProfile.age,
        lifestyle: userProfile.lifestyle,
        condition: userProfile.condition,
        income: userProfile.income,
        city: userProfile.city,
        recommendedPolicy: bestPolicy.policyName
    });

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