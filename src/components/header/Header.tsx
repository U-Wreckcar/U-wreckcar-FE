'use client';
import React from 'react';
import { useRouter } from 'next/router';
import { BaseHeader } from './BaseHeader';
import { RenderHeader } from './RenderHeader';
export default function Header() {
  const router = useRouter();
  const path = router.pathname;
  console.log(path);
  if (path === '/main' || path === '/createutm') {
    return <BaseHeader />;
  } else {
    return <RenderHeader />;
  }
  return <></>;
}
