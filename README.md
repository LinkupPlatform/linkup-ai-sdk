# Linkup AI SDK

Linkup is a web search engine for AI apps. We connect your AI application to the internet. Our API provides grounding data to enrich your AI’s output and increase its precision, accuracy and factuality. Works with AI SDK by Vercel.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Setup](#setup)
- [Example](#example)
- [All Options](#all-options)
- [TypeScript Support](#typescript-support)
- [Links](#links)
- [License](#license)

## Installation

```bash
npm install linkup-ai-sdk
```

## Quick Start

```typescript
import { openai } from "@ai-sdk/openai";
import { generateText, stepCountIs } from "ai";
import { webSearch } from "linkup-ai-sdk";

const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'What was Microsoft’s revenue last quarter and was it well perceived by the market?',
  tools: {
    webSearch: webSearch({ depth: 'standard' }),
  },
  stopWhen: stepCountIs(3),
});

console.log(text);
```

## Setup

1. Create a Linkup account for free at [app.linkup.so](https://app.linkup.so/)
2. Copy the API key from your dashboard to your `.env` file:

```bash
LINKUP_API_KEY=<linkup-api-key>
```

## webSearch tool configuration options

```typescript
webSearch({
  apiKey: "<linkup-api-key>", // optional, if not provided, the API key will be read from the .env file
  depth: "standard", // "standard" or "deep"
  includeImages: false, // true to include images in the search results
  includeDomains: [], // array of domains to include in the search results
  excludeDomains: [], // array of domains to exclude from the search results
  fromDate: null, // date from which to start the search
  toDate: new Date(), // date to which to end the search
})
```

If you want to have a deep understand of the capabilities of the webSearch tool, you can read our [Search Concepts documentation](https://docs.linkup.so/pages/documentation/get-started/concepts).

## License

MIT

## Links

- [Linkup Website](https://www.linkup.so/)
- [Linkup Dashboard](https://app.linkup.so/)
- [Linkup Documentation](https://docs.linkup.so/)

## Support

If you have issues, contact us via email at [support@linkup.so](mailto:support@linkup.so) or join our [Discord server](https://discord.com/invite/9q9mCYJa86).
