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
                  results[0].text,

              sources:
                  results.map(
                      item =>
                      item.policy
                  )
          };

      }

      return {
          answer:
              "No matching policy information found.",

          sources: []
      };

  }
});


const rootAgent = new LlmAgent({
    name: "insurance_advisor",

    model: "gemini-2.5-flash",

  instruction: `
  Always call retrieve_policy_chunks
  for waiting period, co-pay,
  coverage or exclusions.

  Use tool results only.

  Decline medical advice questions.
  `,
    tools: [
        retrievePolicyChunksTool
    ]
});

export default rootAgent;