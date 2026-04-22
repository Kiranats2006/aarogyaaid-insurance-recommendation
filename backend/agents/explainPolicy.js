require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");


async function generatePolicyExplanation(
    userProfile,
    bestPolicy
) {

    try {

        const ai =
        new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });


        const prompt =
`
Explain in 3-4 sentences why
${bestPolicy.policyName}
fits a user with:

Condition: ${userProfile.condition}
City: ${userProfile.city}

Mention:
- waiting period
- affordability
- network suitability

Be warm and simple.
`;


        const response =
        await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt

        });


        return response.text;


    } catch (error) {

        return `
${bestPolicy.policyName}
fits your profile because of favorable
waiting period, affordability and network fit.
`;

    }

}

module.exports = {
    generatePolicyExplanation
};