'use client';
import CircularUnderLoad from '@/components/CircularUnderLoad';
import React from 'react';
import styles from './loading.module.css';

export default function loading() {
  return (
    <div className={styles.container}>
      <CircularUnderLoad />
    </div>
  );
}
