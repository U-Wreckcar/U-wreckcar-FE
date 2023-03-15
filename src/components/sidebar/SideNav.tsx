'use client';
import React, { useEffect, useState } from 'react';
import { PlusSideNav } from './PlusSideNav';
import { SlimSideNav } from './SlimSideNav';
import styles from './styles.module.css';
import { usePathname } from 'next/navigation';

export const SideNav = () => {
  const [plusSide, setPlusSide] = useState(true);
  const [side, setSide] = useState(false);
  const path = usePathname();
  console.log(path);
  useEffect(() => {
    if (path === '/main' || path === '/createutm') {
      setSide(true);
    } else {
      setSide(false);
    }
  }, [path, side]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1100) {
        setPlusSide(false);
      } else if (window.innerWidth >= 1100) {
        setPlusSide(true);
      }
    });
  }, []);
  return (
    <div>
      {side && plusSide && <PlusSideNav setSide={setPlusSide} side={side} />}
      {side && !plusSide && <SlimSideNav setSide={setPlusSide} side={side} />}
    </div>
  );
};
