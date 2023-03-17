'use client';
import { MainBtnTable } from 'components/mainPage/MainBtnTable';
import { MainTable } from 'components/mainPage/MainTable';
import { useState } from 'react';

export default function MainPage() {
  const [summary, setSummary] = useState(true);
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
