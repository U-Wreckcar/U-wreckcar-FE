"use client"
import React from "react"
import styles from "./page.module.css"
import Image from "next/image"
import Link from "next/link"
import bg_one_illust from "public/assets/render/bg-one-illust.png"
import sub_child from "public/assets/sub_child.png"
import sub_img from "public/assets/render/sub-main-img.png"
import m_section_one_two from "public/assets/m_section_one_two.png"
import TryUTM from "../components/tryUTM/TryUTM"
import bg_two_left from "public/assets/render/bg-two-left.png"
import bg_two_right from "public/assets/render/bg-two-right.png"
import bg_six_one from "public/assets/render/bg-six-one.png"
import bg_six_two from "public/assets/render/bg-six-two.png"
import bg_six_three from "public/assets/render/bg-six-three.png"
import six from "public/assets/gif/six.gif"
import seven_sub_img from "public/assets/render/seven_sub_img.png"
import seven_img from "public/assets/render/seven_img.png"
import seven_button from "public/assets/render/seven_button.png"
import create from "public/assets/gif/create.gif"
import f_search from "public/assets/gif/f_search.gif"
import out from "public/assets/gif/out.gif"

import copyright from "public/assets/copyright.png"
import ChangeText from "../components/render/ChangeText"
export default function Home() {
   return (
      <>
         <div>
            <div className={styles.container}>
               <section className={styles.l_section_one}>
                  <article>
                     <div className={styles.text_box}>
                        <ChangeText />
                        <p>UTM 업무 1시간? 유렉카에서는 3분이면 OK</p>
                        <Link className={styles.origin_free_btn} href={"/login"}>
                           <button id="free_btn" className={styles.free_btn}>
                              무료로 시작하기
                           </button>
                        </Link>
                     </div>
                     <Image className={styles.bg_one_illust} src={bg_one_illust} alt="Img" />
                     <Link className={styles.m_free_btn} href={"/webonly"}>
                        <button id="free_btn" className={styles.free_btn}>
                           무료로 시작하기
                        </button>
                     </Link>
                  </article>
               </section>
               <section className={styles.l_section_one_two}>
                  <article>
                     <Image className={styles.web_sub} src={sub_img} alt="Img" />
                     <Image className={styles.m_sub} src={m_section_one_two} alt="Img" />
                     <Image
                        className={styles.sub_child}
                        src={sub_child}
                        alt="Img"
                        width={1608}
                        height={400}
                     />
                  </article>
               </section>
               <section className={styles.try_section}>
                  <TryUTM />
               </section>

               <section className={styles.l_section_two}>
                  <article>
                     <div className={styles.text_box}>
                        <p>1분 1초가 아쉬운 마케터 주목!</p>
                        <h1>UTM 업무에 아직도 많은 시간을 낭비하고 있나요?</h1>
                        <h2>유렉카가 여러분의 업무 시간들 줄여드릴게요!</h2>
                     </div>
                     <div className={styles.m_two_text_box}>
                        {/* <p>1분 1초가 아쉬운 마케터 주목!</p> */}
                        <h1>
                           UTM 업무에 아직도 <br />
                           많은 시간을 낭비하고 있나요?
                        </h1>
                        <h2>유렉카가 여러분의 업무 시간들 줄여드릴게요!</h2>
                     </div>
                  </article>
                  <article>
                     <div className={styles.section_two_img}>
                        <Image src={bg_two_left} alt="Left_img" />
                     </div>
                     <div className={styles.section_two_img}>
                        <Image src={bg_two_right} alt="Right_img" />
                     </div>
                  </article>
               </section>
               <section className={styles.section_three}>
                  <article>
                     <div className={styles.text_box}>
                        <p className={styles.blue_text}>이미 만들어 둔 UTM을 1초만에 추가</p>
                        <h1>다른 곳에서 생성했던 UTM들도</h1>
                        <h2> 유렉카에서 관리해보세요!</h2>

                        <p className={styles.content}>
                           기존에 가지고 있던 UTM을 입력하면 파라미터 별로 자동 분류됩니다.
                           <br /> 생성된 날짜와 간단한 메모를 추가로 기록하여
                           <br />
                           예전 데이터까지 유렉카에서 관리 해보세요.
                        </p>
                     </div>
                     <div className={styles.three_img}>
                        <Image src={create} alt="Gif" />
                     </div>
                     <p className={styles.m_content}>
                        기존에 가지고 있던 UTM을 입력하면 파라미터 별
                        <br />로 자동 분류됩니다. 생성된 날짜와 간단한 메모를 <br />
                        추가로 기록하여 예전 데이터까지 유렉카에서 관리 <br />
                        해보세요.
                     </p>
                  </article>
               </section>
               <section className={styles.l_section_four}>
                  <article>
                     <p className={styles.m_four_context}>
                        생성 날짜, 파라미터값은 물론 메모까지! 원하는 요
                        <br /> 소 입력과 동시에 필터링된 데이터가 보여집니다.
                        <br />
                        검색한 UTM 결과를 다양하게 활용해보세요.
                     </p>
                     <div className={styles.four_img}>
                        <Image src={f_search} alt="Gif" />
                     </div>
                     <div className={styles.text_box}>
                        <p className={styles.sub_title}>필요한 UTM만 바로바로 필터링</p>
                        <h1>내가 원하는 UTM들만</h1>
                        <h2>쏙쏙 뽑아보세요!</h2>
                        <p className={styles.context}>
                           생성 날짜, 파라미터값은 물론 메모까지!
                           <br />
                           원하는 요소 입력과 동시에 필터링된 데이터가 보여집니다.
                           <br />
                           검색한 UTM 결과를 다양하게 활용해보세요.
                        </p>
                     </div>
                  </article>
               </section>
               <section className={styles.l_section_five}>
                  <article>
                     <div className={styles.text_box}>
                        <p className={styles.sub_title}>즉시 팀원에게 공유할 준비 완료</p>
                        <h1>선택한 UTM만 추출하여</h1>
                        <h2>저장해보세요</h2>
                        <p className={styles.context}>
                           필요한 UTM만 선택하여 내보내기!
                           <br />
                           선택된 데이터들을 저장하여 바로 팀원과 공유해보세요.
                        </p>
                     </div>
                     <div className={styles.five_img}>
                        <Image src={out} alt="Gif" />
                     </div>
                     <p className={styles.m_five_context}>
                        필요한 UTM만 선택하여 내보내기!
                        <br />
                        선택된 데이터들을 저장하여 바로 팀원과 공유해보세요
                     </p>
                  </article>
               </section>
               <section className={styles.l_section_six}>
                  <article>
                     <div className={styles.m_mobile_six}>
                        <Image src={six} alt="IMG" />
                     </div>
                     <div className={styles.six_card_item}>
                        <Image src={bg_six_one} alt="IMG" />
                        <h2>
                           여러개의 UTM을
                           <br />한 번에 만들어보세요
                        </h2>

                        <p>
                           추가하기 버튼 클릭 한 번으로
                           <br /> 간편하게 UTM동시 생성!
                        </p>
                     </div>
                     <div className={styles.six_card_item}>
                        <Image src={bg_six_two} alt="IMG" />
                        <h2>
                           자주 쓰는 파라미터를
                           <br />
                           따로 관리해보세요
                        </h2>
                        <p>
                           북마크 기능을 활용하여 <br />
                           간편하고 빠르게 UTM 생성!
                        </p>
                     </div>
                     <div className={styles.six_card_item}>
                        <Image src={bg_six_three} alt="IMG" />
                        <h2>
                           Shorten UTM기능으로
                           <br />긴 UTM 코드들을 간결하게
                        </h2>
                        <p>
                           UTM 코드를 심은 URL을 <br />
                           짧고 간편하게 공유해보세요!
                        </p>
                     </div>
                  </article>
                  <Link href={"/webonly"}>
                     <button>더 많은 기능 보러가기</button>
                  </Link>
               </section>
               <section className={styles.section_seven}>
                  <article>
                     <h1>지금 바로 시작해보세요!</h1>
                     <Image className={styles.seven_first_img} src={seven_img} alt="Img" />
                     <Image className={styles.seven_sub_img} src={seven_sub_img} alt="Img" />
                     <Link className={styles.origin_seven_button} href={"/login"}>
                        <Image
                           id="start_btn"
                           className={styles.seven_button_img}
                           src={seven_button}
                           alt="img"
                        />
                     </Link>
                     <Link href={"/webonly"}>
                        <button className={styles.m_seven_button}>더 많은 기능 보러가기</button>
                     </Link>
                  </article>
               </section>
               <section className={styles.l_section_eight}>
                  <article>
                     <div className={styles.e_cards}>
                        <h1>Contact Us</h1>
                        <p>Uwreckcar@gmail.com</p>
                        <Link href="https://open.kakao.com/o/sbK3Rfaf" target="_blank">
                           카카오톡 문의하기
                        </Link>
                     </div>
                     <div className={styles.e_cards}>
                        <h1>About 유렉카</h1>
                        <Link
                           href="https://unexpected-ceder-0b7.notion.site/11f8741947a441e5822fd8723ef48492"
                           target="_blank"
                        >
                           공지사항
                        </Link>
                        <Link
                           href="https://unexpected-ceder-0b7.notion.site/0a3db0d8103f4be2855a23186fc1b5e3"
                           target="_blank"
                        >
                           이용 가이드
                        </Link>
                        <div className={styles.button_box}></div>
                     </div>
                     <div className={styles.e_cards}>
                        <h1>Privacy & Terms</h1>
                        <Link
                           href="https://unexpected-ceder-0b7.notion.site/567d742a0cac4441991e88ac540c659e"
                           target="_blank"
                        >
                           개인정보처리방침{" "}
                        </Link>

                        <Link
                           href="https://unexpected-ceder-0b7.notion.site/567d742a0cac4441991e88ac540c659e"
                           target="_blank"
                        >
                           이용약관
                        </Link>
                     </div>
                  </article>
                  <div className={styles.e_line}>
                     <Image src={copyright} alt="copyright" width={168} height={15} />
                  </div>
               </section>
            </div>
         </div>
      </>
   )
}
