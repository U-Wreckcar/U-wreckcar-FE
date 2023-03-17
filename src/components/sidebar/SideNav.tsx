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

  useEffect(() => {
    if (path === '/main' || path === '/createutm' || path === '/userinfo') {
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

  useEffect(() => {
    if (window.innerWidth < 520) {
      setPlusSide(false);
    }
  }, [plusSide]);

  return (
    <div>
      {side && plusSide && <PlusSideNav setSide={setPlusSide} side={side} />}
      {side && !plusSide && <SlimSideNav setSide={setPlusSide} side={side} />}
    </div>
  );
};
