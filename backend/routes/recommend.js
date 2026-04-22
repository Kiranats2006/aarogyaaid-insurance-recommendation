const express = require("express");

const router = express.Router();

const {
    rankPolicies
} = require("../services/rankingEngine");

const {
    generatePolicyExplanation
} = require("../agents/explainPolicy");

const Profile =
    require("../models/Profile");


router.post("/", async (req, res) => {

    const userProfile =
        req.body;


    const rankedPolicies =
        rankPolicies(userProfile);


    if (rankedPolicies.length === 0) {

        return res.json({
            message:
                "No suitable policies found"
        });

    }


    const bestPolicy =
        rankedPolicies[0];



    await Profile.create({

        fullName:
            userProfile.fullName,

        age:
            userProfile.age,

        lifestyle:
            userProfile.lifestyle,

        condition:
            userProfile.condition,

        income:
            userProfile.income,

        city:
            userProfile.city,

        recommendedPolicy:
            bestPolicy.policyName

    });



    let explanation;


    try {

        console.log(
            "Calling Gemini explanation..."
        );


        explanation =
            await generatePolicyExplanation(
                userProfile,
                bestPolicy
            );


        console.log(
            "Gemini returned:"
        );

        console.log(
            explanation
        );

    }

    catch (error) {

    console.error(
        "Unexpected explanation error:",
        error
    );

    explanation =
        `${bestPolicy.policyName} is recommended based on your profile.`;

}



    res.json({

        peerComparison:
            rankedPolicies,


        coverageDetails: {

            inclusions:
                bestPolicy.inclusions,

            exclusions:
                bestPolicy.exclusions,

            subLimits:
                bestPolicy.subLimits,

            copayPercent:
                bestPolicy.copayPercent,

            claimType:
                bestPolicy.claimType

        },


        whyThisPolicy:
            explanation

    });

});


module.exports = router;