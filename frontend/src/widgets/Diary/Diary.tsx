import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Mutation } from '@suspensive/react-query';
import { useState } from 'react';
import { getTodayDate } from './utils';
import { reviseDiaryMutationOptions } from './models';
import Title from './parts/Title';

const Diary = () => {
  const [diaryText, setDiaryText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [changes, setChanges] = useState<
    {
      original: string;
      corrected: string;
      reason: string;
      alternative: string;
    }[]
  >([]);

  return (
    <>
      <Title />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px]">
        <div className="h-full">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              오늘 하루를 영어로 기록해보세요
            </h3>
            <p className="text-sm text-gray-500 mb-2">{getTodayDate()}</p>
          </div>
          <Textarea
            placeholder="오늘 하루를 영어로 기록해보세요..."
            className="h-96 resize-none"
            value={diaryText}
            onChange={(e) => setDiaryText(e.target.value)}
          />
          <div className="mt-4 text-center">
            <Mutation {...reviseDiaryMutationOptions}>
              {({ mutate, isPending }) => (
                <Button
                  onClick={() =>
                    mutate(diaryText, {
                      onSuccess: ({ corrected, changes }) => {
                        setCorrectedText(corrected);
                        setChanges(changes);
                      },
                      onError: () => {
                        alert('교정 중 오류가 발생했습니다. 다시 시도해주세요.');
                      },
                    })
                  }
                  disabled={!diaryText.trim() || isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                >
                  {isPending ? '교정 중...' : '교정하기'}
                </Button>
              )}
            </Mutation>
          </div>
        </div>
        <div className="h-full">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">교정 결과</h3>
          <Textarea
            placeholder="교정된 내용이 여기에 표시됩니다..."
            className="h-96 resize-none"
            readOnly
            value={correctedText}
          />
          {changes.length > 0 && (
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2 text-gray-700">교정 내용</h4>
              <div className="space-y-3">
                {changes.map((change, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg border">
                    <div className="text-sm">
                      <span className="text-red-600 line-through">{change.original}</span>
                      <span className="mx-2">→</span>
                      <span className="text-green-600 font-medium">{change.corrected}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      <strong>이유:</strong> {change.reason}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      <strong>대안:</strong> {change.alternative}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Diary;
