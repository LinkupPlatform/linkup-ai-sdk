import { tool } from 'ai';
import { LinkupClient, type LinkupSearchResponse } from 'linkup-sdk';
import { z } from 'zod';
import type { LinkupSearchConfig } from './types.js';

/**
 * Creates a web search tool powered by Linkup for use with Vercel AI SDK
 *
 * @param config - Configuration options for the Linkup search
 * @returns A tool that can be used with AI SDK's generateText, streamText, etc.
 *
 * @example
 * ```ts
 * import { openai } from "@ai-sdk/openai";
 * import { generateText, stepCountIs } from "ai";
 * import { webSearch } from "./index.js";
 *
 * // Just set LINKUP_API_KEY in .env, then:
 * const { text } = await generateText({
 *   model: openai('gpt-4o-mini'),
 *   prompt: 'What was Microsoft’s revenue last quarter and was it well perceived by the market?',
 *   tools: {
 *     webSearch: webSearch({ depth: 'standard' }),
 *   },
 *   stopWhen: stepCountIs(3),
 * });
 * ```
 */

export function webSearch(
  config: LinkupSearchConfig = {
    depth: 'standard',
  },
) {
  const { apiKey = process.env.LINKUP_API_KEY, ...searchParams } = config;

  return tool({
    description:
      'Search the web in real time using Linkup to retrieve current information, facts, and news from trusted sources. Use this tool for: real-time data (weather, stocks, sports scores, events), breaking news, current events, recent research, product information, up-to-date prices, schedules, and any information not available in your knowledge base. Returns comprehensive content from the most relevant sources.',
    inputSchema: z.object({
      query: z
        .string()
        .min(1)
        .describe(
          'Natural language search query. Full questions work best, e.g., "How does the new EU AI Act affect startups?"',
        ),
    }),
    execute: async ({ query }) => {
      if (!apiKey) {
        throw new Error(
          'LINKUP_API_KEY is required. Set it in environment variables or pass it in config.',
        );
      }
      const client = new LinkupClient({
        apiKey,
        baseUrl: process.env.LINKUP_BASE_URL,
      });

      try {
        const response = await client.search({
          query,
          ...searchParams,
          outputType: 'searchResults',
        });

        return response;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Linkup Search error: ${error.message}`);
        }
        throw error;
      }
    },
  });
}

export type { LinkupSearchConfig, LinkupSearchResponse };
