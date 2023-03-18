'use client';
import { setCookie } from '@/util/async/Cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const KakaoCallback = () => {
  const router = useRouter();
  console.log(process.env.NEXT_PUBLIC_API);
  console.log(router);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log('urlParams', urlParams);
    const code = urlParams.get('code');
    console.log('code', code);

    if (code) {
      // 백엔드 서버에 액세스 토큰과 리프레시 토큰을 요청합니다.
      fetch(`${process.env.NEXT_PUBLIC_API}/auth/kakao/callback?code=${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

        .then(async (response) => {
          const res = await response.json();
          // console.log('json', response.json());
          console.log('1', res);
          setCookie('access_token', res.access_token);
          setCookie('refresh_token', res.refresh_token);

        })
        .then(() => router.push('/main'))

        // .then(({ access_token, refresh_token }) => {
        //   // 쿠키에 토큰을 저장하거나 필요한 작업 수행
        //   document.cookie = `access_token=${access_token}; secure=false;`;
        //   document.cookie = `refresh_token=${refresh_token}; secure=false;`;
        //   console.log('access_token', access_token);
        //   console.log('refresh_token', refresh_token);
        //   // 메인 페이지로 리다이렉션
        //   router.push('/main');
        // })
        .catch((error) => {
          // 에러 처리
          console.error(error);
          //   router.push('/error');
        });
    } else {
      // 에러 처리
      //   router.push('/error');
    }
  }, [router]);

  return (
    <div>
      <p>카카오 로그인 콜백 처리 중...</p>
    </div>
  );
};

export default KakaoCallback;
