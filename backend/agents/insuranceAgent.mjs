import "dotenv/config";
import { LlmAgent } from "@google/adk";


async function retrieve_policy_chunks(query) {
    /*
    Use this function whenever a user asks about:
    - waiting periods
    - co-pay
    - exclusions
    - coverage
    */

    const text = query.toLowerCase();

    if (text.includes("waiting")) {
        return {
            answer:
                "Care Secure Plus has a 12 month waiting period."
        };
    }

    if (text.includes("co-pay")) {
        return {
            answer:
                "Care Secure Plus has 10 percent co-pay."
        };
    }

    return {
        answer:
            "No matching policy information found."
    };
}


const rootAgent = new LlmAgent({

    name: "insurance_advisor",

    model: "gemini-2.5-flash",

    instruction: `
When a user asks about waiting periods,
co-pay, exclusions, or coverage,

call the function retrieve_policy_chunks.

Do not answer those questions yourself.

Use the function result to answer.
`,

    tools: [
        retrieve_policy_chunks
    ]

});

export default rootAgent;