interface GetRevisedContentsResponse {
  corrected: string;
  changes: {
    original: string;
    corrected: string;
    reason: string;
    alternative: string;
  }[];
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getRevisedContents = async (contents: string): Promise<GetRevisedContentsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/diary/revise`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data: GetRevisedContentsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
};
