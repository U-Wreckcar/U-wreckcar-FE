'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BaseHeader } from './BaseHeader';
import { RenderHeader } from './RenderHeader';
import { usePathname } from 'next/navigation';
export default function Header() {
  const [renderPath, setRenderPath] = useState(false);
  const [basePath, setBasePath] = useState(false);
  const noHead = <></>;
  const pathName = usePathname();
  useEffect(() => {
    if (
      pathName === '/main' ||
      pathName === '/createutm' ||
      pathName === '/userinfo' ||
      pathName === '/auth'
    ) {
      setBasePath(true);
    } else {
      setRenderPath(true);
    }
  }, [pathName]);

  return (
    <>
      {basePath && <BaseHeader pathName={pathName} />}
      {renderPath && <RenderHeader />}
    </>
  );
}
