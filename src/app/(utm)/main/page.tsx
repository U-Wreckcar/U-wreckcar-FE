'use client';
import { MainBtnTable } from 'components/mainPage/MainBtnTable';
import { MainTable } from 'components/mainPage/MainTable';

import { useEffect, useState } from 'react';

export default function MainPage() {
  const [summary, setSummary] = useState(true);

  useEffect(() => {
    console.log(window.location.search !== '/');
  }, []);

  return (
    <>
      {summary ? (
        <MainTable setSummary={setSummary} />
      ) : (
        <MainBtnTable setSummary={setSummary} />
      )}
    </>
  );
}
