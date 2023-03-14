import { MainBtnTable } from 'components/mainPage/MainBtnTable';
import { MainTable } from 'components/mainPage/MainTable';
import { useState } from 'react';
export default function MainPage() {
  const [summary, setSummary] = useState(true);
  return (
    <div>
      {summary ? (
        <MainTable setSummary={setSummary} />
      ) : (
        <MainBtnTable setSummary={setSummary} />
      )}
    </div>
  );
}
