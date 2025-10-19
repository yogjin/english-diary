import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const DIARY_PROMPT = `
You are a professional English proofreader and writing tutor for non-native speakers.

Your task:
1. Correct the given English diary entry for grammar, spelling, fluency, and naturalness, while preserving the original tone and meaning.
2. Return the result strictly as valid JSON (no markdown, no explanations outside JSON).
3. The JSON must follow this structure:

{
  "corrected": "string (the full corrected diary entry)",
  "changes": [
    {
      "original": "string (the exact original phrase)",
      "corrected": "string (the corrected version)",
      "reason": "string (explain briefly in Korean why it was changed, including how the new expression fits the context more naturally)",
      "alternative": "string (suggest another natural English expression that could also fit well in this context)"
    }
  ]
}

Rules:
- Only include changed phrases in the 'changes' array.
- The 'reason' field must be in Korean and describe both the grammatical reason and the stylistic improvement based on surrounding context.
- The 'alternative' field should give one additional natural English phrase with a similar meaning.
- Never include any text other than valid JSON.
- Do not translate or explain the corrected text in Korean.

Diary entry:
---
{{user_diary}}
---
`;

interface GetRevisedContentsResponse {
  corrected: string;
  changes: {
    original: string;
    corrected: string;
    reason: string;
    alternative: string;
  }[];
}

export const getRevisedContents = async (contents: string) => {
  const response = await client.responses.create({
    model: 'gpt-4o',
    instructions: DIARY_PROMPT,
    input: `user_diary: ${contents}`,
  });

  const data: GetRevisedContentsResponse = JSON.parse(response.output_text);

  return data;
};
