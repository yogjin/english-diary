import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { useState } from 'react';
import { getTodayDate } from './utils';
import { getRevisedContents } from './apis';

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
  const [isCorrecting, setIsCorrecting] = useState(false);

  const reviseDiary = async () => {
    if (!diaryText.trim()) {
      alert('일기를 작성해주세요!');
      return;
    }

    setIsCorrecting(true);

    try {
      const data = await getRevisedContents(diaryText);
      console.log(data);
      setCorrectedText(data.corrected);
      setChanges(data.changes);
    } catch (error) {
      console.error('교정 중 오류가 발생했습니다:', error);
      alert('교정 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsCorrecting(false);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          매일 영어로 일기를 쓰고 교정받으세요
        </h2>
        <p className="text-gray-600">영어 일기를 작성하고 AI가 문법과 표현을 교정해드립니다</p>
      </div>

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
            <Button
              onClick={reviseDiary}
              disabled={!diaryText.trim() || isCorrecting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
            >
              {isCorrecting ? '교정 중...' : '교정하기'}
            </Button>
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

          {/* 변경사항 표시 */}
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
