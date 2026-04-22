require("dotenv").config();

const {
    GoogleGenAI
} = require("@google/genai");


function buildFallbackExplanation(
    userProfile,
    bestPolicy
) {

    return `
    Given your ${userProfile.condition} profile, finding affordable coverage with manageable waiting periods is important.
${bestPolicy.policyName} is recommended for a
${userProfile.age}-year-old user with
${userProfile.condition}
because its ${bestPolicy.waitingPeriodMonths}-month
waiting period is favorable for managing
pre-existing condition coverage.

Its premium of Rs ${bestPolicy.premium}
fits the ${userProfile.income} income band,
making it relatively affordable while still
offering meaningful protection.

Because you are in ${userProfile.city},
the policy's network support improves access
to hospitals and strengthens claim usability.

Its ${bestPolicy.copayPercent}% co-pay and
cover amount of Rs ${bestPolicy.coverAmount}
also improve value compared with alternatives.

Compared with other policies, this option
scores better for your profile due to shorter
waiting, condition support, affordability,
and network suitability.
`;

}



async function generatePolicyExplanation(
    userProfile,
    bestPolicy
) {

    try {

        console.log(
            "Calling Gemini explanation..."
        );


        const ai =
            new GoogleGenAI({
                apiKey:
                    process.env.GEMINI_API_KEY
            });


        const prompt = `
Write 170-190 words explaining why
${bestPolicy.policyName}
fits this user.

Age: ${userProfile.age}
Lifestyle: ${userProfile.lifestyle}
Condition: ${userProfile.condition}
Income: ${userProfile.income}
City: ${userProfile.city}

You must explicitly discuss:

1. Why the ${bestPolicy.waitingPeriodMonths}-month
waiting period matters

2. Why premium Rs ${bestPolicy.premium}
fits this income

3. Why network support in
${userProfile.city}
matters

4. Why this policy helps
${userProfile.condition}

Mention co-pay and cover amount.

Do not give generic advice.
Be specific and personalized.
`;


        const response =
            await ai.models.generateContent({

                model:
                    "gemini-2.5-flash",

                contents:
                    prompt

            });


        if (
            response &&
            response.text
        ) {

            return response.text;

        }


        return buildFallbackExplanation(
            userProfile,
            bestPolicy
        );

    }

    catch (error) {

        console.error(
            "Gemini unavailable, using fallback:",
            error.message
        );


        return buildFallbackExplanation(
            userProfile,
            bestPolicy
        );

    }

}


module.exports = {
    generatePolicyExplanation
};