import { mutationOptions } from '@tanstack/react-query';
import { postReviseDiary } from './apis';

export const reviseDiaryMutationOptions = mutationOptions({
  mutationFn: (diaryText: string) => postReviseDiary(diaryText),
});
