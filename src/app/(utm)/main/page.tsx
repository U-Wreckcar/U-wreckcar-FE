'use client';
import { MainBtnTable } from 'components/mainPage/MainBtnTable';
import { MainTable } from 'components/mainPage/MainTable';
import { useEffect, useState } from 'react';
import Axios from 'util/axiosConfig';
export default function MainPage() {
  const [summary, setSummary] = useState(true);
  useEffect(() => {
    if (window.location.search !== '/') {
      const res = async () => {
        await Axios.get('/api/user/profile');
        console.log(res);
      };
    }
  }, [window.location.search]);
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
