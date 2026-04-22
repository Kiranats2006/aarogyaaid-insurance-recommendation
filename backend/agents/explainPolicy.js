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
        Explain in 150-200 words why
        ${bestPolicy.policyName}
        fits a user with:

        Age: ${userProfile.age}
        Lifestyle: ${userProfile.lifestyle}
        Condition: ${userProfile.condition}
        Income: ${userProfile.income}
        City: ${userProfile.city}

        Explicitly reference at least 3 profile factors.

        Mention:
        waiting period,
        affordability,
        network suitability.

        Warm, empathetic tone.
        `;


        const response =
        await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt

        });


        return response.text;


    } catch (error) {

        return `
        ${bestPolicy.policyName} is recommended for a
        ${userProfile.age}-year-old user with
        ${userProfile.condition}
        because its ${bestPolicy.waitingPeriodMonths}-month
        waiting period is favorable.

        Its premium of Rs ${bestPolicy.premium}
        fits the ${userProfile.income} income band.

        It also supports hospitals in
        ${userProfile.city},
        making it a stronger fit than alternatives.
        `;

    }

}

module.exports = {
    generatePolicyExplanation
};