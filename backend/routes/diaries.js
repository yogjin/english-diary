const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

router.post('/revise', async (req, res) => {
  try {
    const { diaryText } = req.body;

    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: DIARY_PROMPT.replace('{{user_diary}}', diaryText),
        },
      ],
      temperature: 0.3,
    });

    const data = JSON.parse(response.choices[0].message.content);
    res.json(data);
  } catch (error) {
    console.error('OpenAI API 오류:', error);
    res.status(500).json({ error: '교정 처리 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
