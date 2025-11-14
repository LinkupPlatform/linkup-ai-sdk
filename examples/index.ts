import { openai } from '@ai-sdk/openai';
import { generateText, stepCountIs } from 'ai';
import { webSearch } from '../src/index.js';

const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'What was Microsoft’s revenue last quarter and was it well perceived by the market?',
  tools: {
    webSearch: webSearch({ depth: 'standard' }),
  },
  stopWhen: stepCountIs(3),
});

console.log(text);
