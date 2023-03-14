import React, { useEffect, useState } from 'react';
import { PlusSideNav } from './PlusSideNav';
import { SlimSideNav } from './SlimSideNav';
import styles from './styles.module.css';

export const SideNav = () => {
  const [side, setSide] = useState(true);
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1100) {
        setSide(false);
      } else if (window.innerWidth >= 1100) {
        setSide(true);
      }
    });
  }, []);
  return (
    <div>
      {side ? (
        <PlusSideNav setSide={setSide} side={side} />
      ) : (
        <SlimSideNav setSide={setSide} side={side} />
      )}
    </div>
  );
};
