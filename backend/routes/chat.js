const express = require("express");
const router = express.Router();

require("dotenv").config();

const { GoogleGenAI } =
require("@google/genai");

const {
    retrievePolicyChunks
} = require("../agents/tools");

const Profile =
require("../models/Profile");


router.post("/", async (req, res) => {

    const question =
        req.body.question;

    let userProfile =
        req.body.userProfile;


    if (!userProfile) {

        const lastProfile =
            await Profile
            .findOne()
            .sort({ createdAt: -1 });

        if (lastProfile) {
            userProfile = lastProfile;
        }

    }


    if (
        question.toLowerCase().includes("surgery")
    ) {

        return res.json({
            answer:
            "I can explain policy coverage, but I cannot provide medical advice."
        });

    }


    try {

        const chunks =
            await retrievePolicyChunks({
                query: question
            });


        const sources = [];

        for (let i = 0; i < chunks.length; i++) {

            if (
                !sources.includes(
                    chunks[i].policy
                )
            ) {

                sources.push(
                    chunks[i].policy
                );

            }

        }


        let retrievedContext =
            "No matching clauses found.";

        if (chunks.length > 0) {

            retrievedContext = "";

            for (let i = 0; i < chunks.length; i++) {

                retrievedContext +=
                    chunks[i].text + "\n";

            }

        }


        const ai =
            new GoogleGenAI({
                apiKey:
                    process.env.GEMINI_API_KEY
            });


        const prompt =
`
User profile:
Condition: ${userProfile?.condition || "Unknown"}
City: ${userProfile?.city || "Unknown"}

Question:
${question}

Retrieved policy clauses:
${retrievedContext}

Answer ONLY using retrieved policy clauses.
Define terms simply.
Use a realistic example for this user.
`;


        const response =
            await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });


        const answer =
            response.text ||
            "Explanation unavailable.";


        res.json({
            answer: answer,
            sources: sources
        });

    }

    catch (error) {

        console.error(error);

        res.json({
            error: error.message
        });

    }

});


module.exports = router;