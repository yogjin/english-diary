export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');
  const weekday = today.getDay();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  return `${year}년 ${month}월 ${date}일 ${weekdays[weekday]}요일`;
};
