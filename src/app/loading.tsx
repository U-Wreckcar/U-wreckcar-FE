'use client';
import CircularUnderLoad from '@/components/CircularUnderLoad';
import { Metadata } from 'next';
import React from 'react';
import styles from './loading.module.css';
export const metadata: Metadata = {
  openGraph: {
    title: '유렉카',
    description: '복잡한 UTM을 빠르게 만들자!',
    url: 'https://utm.works',
    siteName: '유렉카',
    images: [
      {
        url: 'https://utm.works/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://utm.works/og-alt.png',
        width: 1200,
        height: 600,
        alt: 'OG IMAGE',
      },
    ],
    locale: 'ko-kr',
    type: 'website',
  },
};
export default function loading() {
  return (
    <div className={styles.container}>
      <CircularUnderLoad />
    </div>
  );
}
