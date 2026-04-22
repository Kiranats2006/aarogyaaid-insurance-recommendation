const express = require("express");

const router = express.Router();

const {
    retrievePolicyChunks
} = require("../agents/tools");

router.post("/", async (req, res) => {

    const question = req.body.question;

    const userProfile = req.body.userProfile;

    if (
        question.toLowerCase().includes("waiting period")
    ) {

        return res.json({

            answer:
            "Waiting period is the time before certain conditions are covered.",

            sources:
            retrievePolicyChunks({
                query: "waiting period"
            })

        });

    }

    if (
        question.toLowerCase().includes("co-pay")
    ) {

        return res.json({

            answer:
            `For someone with ${userProfile.condition}
in ${userProfile.city},
co-pay means you may pay part of claim costs yourself.`,

            sources:
            retrievePolicyChunks({
                query: "co-pay"
            })

        });

    }

    if (
        question.toLowerCase().includes("surgery")
    ) {

        return res.json({
            answer:
            "I can explain policy coverage, but I cannot provide medical advice."
        });

    }

    return res.json({
        answer:
        "I could not find that information in uploaded policies."
    });

});

module.exports = router;