'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BaseHeader } from './BaseHeader';
import { RenderHeader } from './RenderHeader';
import { usePathname } from 'next/navigation';
export default function Header() {
  const [path, setPath] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    if (pathName === '/main' || pathName === '/createutm') {
      setPath(true);
    } else {
      setPath(false);
    }
  }, [pathName, path]);
  // if (path === '/main' || path === '/createutm') {
  //   return <BaseHeader />;
  // } else {
  //   return <RenderHeader />;
  // }
  return <>{path ? <BaseHeader /> : <RenderHeader />}</>;
}
