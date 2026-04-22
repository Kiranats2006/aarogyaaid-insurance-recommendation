import "dotenv/config";
import { LlmAgent, FunctionTool } from "@google/adk";

import vectorStoreModule from "../services/vectorStore.js";

const searchChunks = vectorStoreModule.searchChunks;


const retrievePolicyChunksTool = new FunctionTool({
    name: "retrieve_policy_chunks",

    description:
        "Retrieve policy waiting periods and co-pay information from stored policy data.",

    parameters: {
        type: "object",
        properties: {
            query: {
                type: "string"
            }
        },
        required: ["query"]
    },

    execute: async ({ query }) => {

        const results =
            searchChunks(query);

        if (results.length > 0) {

            return {
                answer:
                    results[0].text
            };

        }

        return {
            answer:
                "No matching policy information found."
        };
    }
});


const rootAgent = new LlmAgent({
    name: "insurance_advisor",

    model: "gemini-2.5-flash",

    instruction: `
If user asks about waiting periods,
co-pay, exclusions, or coverage,

ALWAYS call retrieve_policy_chunks.

Use only tool results.
Do not answer from model knowledge.
`,

    tools: [
        retrievePolicyChunksTool
    ]
});

export default rootAgent;