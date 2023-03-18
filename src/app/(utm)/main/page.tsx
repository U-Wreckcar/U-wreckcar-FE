'use client';
import { MainBtnTable } from 'components/mainPage/MainBtnTable';
import { MainTable } from 'components/mainPage/MainTable';
import { useEffect, useState } from 'react';
import { isConstructorDeclaration } from 'typescript';
import Axios from 'util/axiosConfig';
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
