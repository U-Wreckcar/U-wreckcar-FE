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
    if (
      pathName === '/main' ||
      pathName === '/createutm' ||
      pathName === '/userinfo'
    ) {
      setPath(true);
    } else {
      setPath(false);
    }
  }, [pathName, path]);

  return <>{path ? <BaseHeader /> : <RenderHeader />}</>;
}
