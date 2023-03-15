
import React from 'react';
import styles from './page.module.css';
import sectionseven from 'assets/sectionseven.png';
export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <section className={styles.section_one}>
          <article></article>
        </section>
        <section className={styles.section_two}>
          <article></article>
          <article></article>
        </section>
        <section className={styles.section_three}>
          <article></article>
        </section>
        <section className={styles.section_four}>
          <article></article>
        </section>
        <section className={styles.section_five}>
          <article></article>
        </section>
        <section className={styles.section_six}>
          <article></article>
        </section>
        <section className={styles.section_seven}>
          <article>sdf</article>
        </section>
        <section className={styles.section_eight}>
          <article></article>
        </section>
      </div>
    </div>
  );
}
