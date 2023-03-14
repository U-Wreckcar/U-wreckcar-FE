import React from 'react';
import { CreateUTM } from 'components/createPage/CreateUTM';
import { CreateCategory } from 'components/createPage/CreateCategory';
import { CreateCopyBox } from 'components/createPage/CreateCopyBox';
import styles from './createutm.module.css';
import Layout from '../app/dashboard/layout';

export default function CreateUTMPage() {
  return (
    <Layout>
      <div className={styles.create_container}>
        <h1>새 UTM 생성하기</h1>
        <span className="category_text">
          UTM은 최대 5개까지 생성할 수 있습니다.
        </span>
        <CreateCategory />
        <CreateUTM />
        <CreateCopyBox />
      </div>
    </Layout>
  );
}
