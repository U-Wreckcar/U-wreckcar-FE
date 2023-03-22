'use client';
import { MainBtnTable } from './MainBtnTable';
import { MainTable } from './MainTable';
import { useState } from 'react';

export default function MainPageComponent() {

  const [summary, setSummary] = useState(false)

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
