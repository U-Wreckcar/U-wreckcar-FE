'use client';
import React from 'react';
import styles from './page.module.css';
import sectionseven from 'assets/sectionseven.png';
import Image from 'next/image';

import section_two_left from 'assets/section_two_left.png';
import section_two_right from 'assets/section_two_right.png';
import section_one_two from 'assets/section_one_two.png';
import create from 'assets/gif/create.gif';
export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <section className={styles.section_one}>
          <article>
            <div>
              <h1>복잡한 UTM 관리 </h1>
              <h1>유렉카로 해결하세요! </h1>
              <p>UTM 카테고라이징 서비스 전문 기업 유-렉카를 만나보세요!</p>
            </div>
            <button>무료로 시작하기</button>
          </article>
        </section>
        <section className={styles.section_one_two}>
          <article>
            <Image src={section_one_two} alt="Img" />
          </article>
        </section>
        <section className={styles.section_two}>
          <article>
            <div>
              <p>유렉카 하나로 모든 관리를!</p>
              <h2>여기저기 널려 있는 UTM을</h2>
              <h1>한 군데에서 관리하고 싶지 않으신가요?</h1>
            </div>
          </article>
          <article>
            <div className={styles.section_two_img}>
              <Image src={section_two_left} alt="Left_img" />
            </div>
            <div className={styles.section_two_img}>
              <Image src={section_two_right} alt="Right_img" />
            </div>
          </article>
        </section>
        <section className={styles.section_three}>
          <article>
            <p>간단하고 빠른 UTM 생성</p>
            <h2>복잡한 UTM을 생성 후</h2>
            <h1>관리까지 해보세요!</h1>
            <pre>
              이부분은 본문이래요이부분은 본문이래요이부분은
              <br />
              본문이래요이부분은 본문이래요이부분은 본문이래요이부분은
              <br />
              본문이래요이부분은 본문이래요이부분은 본문이래요이부분은
              본문이래요이부분은 본문이래요
            </pre>
          </article>
          <article>
            <Image src={create} alt="Gif" />
          </article>
        </section>
        <section className={styles.section_four}>
          <article>
            <Image src={create} alt="Gif" />
          </article>
          <article>
            <p>내가 원하는 UTM만</p>
            <h2>복잡한 UTM을 생성 후</h2>
            <h1>관리까지 해보세요!</h1>
            <pre>
              이부분은 본문이래요이부분은 본문이래요이부분은
              <br />
              본문이래요이부분은 본문이래요이부분은 본문이래요이부분은
              <br />
              본문이래요이부분은 본문이래요이부분은 본문이래요이부분은
              본문이래요이부분은 본문이래요
            </pre>
          </article>
        </section>
        <section className={styles.section_five}>
          <article>
            <p>간단하고 빠른 UTM 생성</p>
            <h2>복잡한 UTM을 생성 후</h2>
            <h1>관리까지 해보세요!</h1>
            <pre>
              이부분은 본문이래요이부분은 본문이래요이부분은
              <br />
              본문이래요이부분은 본문이래요이부분은 본문이래요이부분은
              <br />
              본문이래요이부분은 본문이래요이부분은 본문이래요이부분은
              본문이래요이부분은 본문이래요
            </pre>
          </article>
          <article>
            <Image src={create} alt="Gif" />
          </article>
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
