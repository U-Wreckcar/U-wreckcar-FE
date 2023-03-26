"use client"
import React, { useEffect, useState } from "react"
import { Media, MediaContextProvider } from "./Media"
import styles from "./page.module.css"
import sectionseven from "assets/sectionseven.png"
import Image from "next/image"

import section_two_left_ns from "assets/section_two_left_ns.png"
import section_two_right_ns from "assets/section_two_right_ns.png"
import section_one_two from "assets/section_one_two.png"
import six_one from "assets/six_one.png"
import six_two from "assets/six_two.png"
import six_three from "assets/six_three.png"
import seven_img from "assets/seven_img.png"
import create from "assets/gif/create.gif"
import f_search from "assets/gif/f_search.gif"
import out from "assets/gif/out.gif"

import copyright from "assets/copyright.png"
import seven_button from "assets/seven_button.png"
import Link from "next/link"
import Mobile from "@/components/m_renderPage/Mobile"
import IsRender from "@/components/m_renderPage/IsRender"
import { render } from "react-dom"
import RenderModal from "@/components/renderModal/RenderModal"
export default function Home() {
  const texts = ["복잡한", "귀찮은", "어려운"]
  const [text, setText] = useState(texts)
  const [index, setIndex] = useState(0)
  const [alert, setAlert] = useState(true)

  useEffect(() => {
    const intervalText = setInterval(() => {
      setIndex((idx) => (idx + 1) % texts.length)
    }, 850)

    return () => clearInterval(intervalText)
  }, [])

  const onClickKakao = () => {
    window.open("https://open.kakao.com/o/sbK3Rfaf", "_blank")
  }

  const onClickLaw = () => {
    window.open(
      "https://unexpected-ceder-0b7.notion.site/567d742a0cac4441991e88ac540c659e",
      "_blank"
    )
  }

  const onClickUse = () => {
    window.open(
      "https://unexpected-ceder-0b7.notion.site/c83db210e0574b3b90329f5cc46caf28",
      "_blank"
    )
  }

  const onClickNoti = () => {
    window.open(
      " https://unexpected-ceder-0b7.notion.site/11f8741947a441e5822fd8723ef48492",
      "_blank"
    )
  }

  const onClickGuide = () => {
    window.open(
      "https://unexpected-ceder-0b7.notion.site/0a3db0d8103f4be2855a23186fc1b5e3",
      "_blank"
    )
  }

  return (
    <>
      {alert && (
        <RenderModal isOpen={alert} onRequestClose={() => setAlert(false)} />
      )}
      <MediaContextProvider>
        <Media at="sm">
          <Mobile />
        </Media>
        <Media greaterThan="sm">
          {/* <IsRender /> */}
          <div>
            <div className={styles.container}>
              <section className={styles.section_one}>
                <article>
                  <div>
                    <h1>{text[index]} UTM 관리 </h1>
                    <h1>유렉카로 해결하세요! </h1>
                    <p>UTM 업무 1시간? 유렉카에서는 3분이면 OK</p>
                  </div>
                  <Link href={"/login"}>
                    <button id="free_btn">무료로 시작하기</button>
                  </Link>
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
                    <p>1분 1초가 아쉬운 마케터 주목!</p>
                    <h2>UTM 업무에 아직도 많은 시간을 낭비하고 있나요?</h2>
                    <h1>유렉카가 여러분의 업무 시간들 줄여드릴게요!</h1>
                  </div>
                </article>
                <article>
                  <div className={styles.section_two_img}>
                    <Image src={section_two_right_ns} alt="Left_img" />
                  </div>
                  <div className={styles.section_two_img}>
                    <Image src={section_two_left_ns} alt="Right_img" />
                  </div>
                </article>
              </section>
              <section className={styles.section_three}>
                <article>
                  <p>이미 만들어 둔 UTM을 1초만에 추가</p>
                  <h2>다른 곳에서 생성했던 UTM들도</h2>
                  <h1>유렉카에서 관리해보세요!</h1>
                  <p className={styles.three_context}>
                    기존에 가지고 있던 UTM을 입력하면 파라미터 별로 자동
                    분류됩니다.
                    <br />
                    생성된 날짜와 간단한 메모를 추가로 기록하여
                    <br />
                    예전 데이터까지 유렉카에서 관리 해보세요.
                  </p>
                </article>
                <article>
                  <Image src={create} alt="Gif" />
                </article>
              </section>
              <section className={styles.section_four}>
                <article>
                  <Image src={f_search} alt="Gif" />
                </article>
                <article>
                  <p className={styles.sub_title}>
                    필요한 UTM만 바로바로 필터링
                  </p>
                  <h1>내가 원하는 UTM들만</h1>
                  <h2>쏙쏙 뽑아보세요!</h2>
                  <p className={styles.context}>
                    생성 날짜, 파라미터값은 물론 메모까지!
                    <br />
                    원하는 요소 입력과 동시에 필터링된 데이터가 보여집니다.
                    <br />
                    검색한 UTM 결과를 다양하게 활용해보세요.
                  </p>
                </article>
              </section>
              <section className={styles.section_five}>
                <article>
                  <p className={styles.sub_title}>
                    즉시 팀원에게 공유할 준비 완료
                  </p>
                  <h1>
                    선택한 UTM만 추출하여
                    <br />
                    <span>저장해보세요</span>
                  </h1>

                  <p className={styles.context}>
                    필요한 UTM만 선택하여 내보내기!
                    <br />
                    선택된 데이터들을 저장하여 바로 팀원과 공유해보세요.
                  </p>
                </article>
                <article>
                  <Image src={out} alt="Gif" />
                </article>
              </section>
              <section className={styles.section_six}>
                <article>
                  <div className={styles.six_card_item}>
                    <Image src={six_one} alt="IMG" />
                    <h2>
                      여러개의 UTM을
                      <br />
                      <span>한 번에 만들어보세요</span>
                    </h2>

                    <p>추가하기 버튼 클릭 한 번으로 간편하게 UTM동시 생성!</p>
                  </div>
                  <div className={styles.six_card_item}>
                    <Image src={six_two} alt="IMG" />
                    <h2>
                      자주 쓰는 파라미터를
                      <br />
                      <span>따로 관리해보세요</span>
                    </h2>
                    <p>북마크 기능을 활용하여 간편하고 빠르게 UTM 생성!</p>
                  </div>
                  <div className={styles.six_card_item}>
                    <Image src={six_three} alt="IMG" />
                    <h2>
                      Shorten UTM기능으로
                      <br />
                      <span>긴 UTM 코드들을 간결하게</span>
                    </h2>
                    <p>UTM 코드를 심은 URL을 짧고 간편하게 공유해보세요!</p>
                  </div>
                </article>
                <button onClick={onClickGuide}>더 많은 기능 보러가기</button>
              </section>
              <section className={styles.section_seven}>
                <article>
                  <h1>지금 바로 시작해보세요!</h1>
                  <Image
                    className={styles.seven_first_img}
                    src={seven_img}
                    alt="Img"
                  />
                  <Link href={"/login"}>
                    <Image
                      id="start_btn"
                      className={styles.seven_button_img}
                      src={seven_button}
                      alt="img"
                    />
                  </Link>
                </article>
              </section>
              <section className={styles.section_eight}>
                <article>
                  <div className={styles.e_cards}>
                    <h4>Contact Us</h4>
                    <p>Uwreckcar@gmail.com</p>
                    <p style={{ cursor: "pointer" }} onClick={onClickKakao}>
                      카카오톡 문의하기
                    </p>
                  </div>
                  <div className={styles.e_cards}>
                    <h4>About 유렉카</h4>
                    <p style={{ cursor: "pointer" }} onClick={onClickNoti}>
                      공지사항
                    </p>
                    <p style={{ cursor: "pointer" }} onClick={onClickGuide}>
                      이용 가이드
                    </p>
                    <div className={styles.button_box}></div>
                  </div>
                  <div className={styles.e_cards}>
                    <h4>Privacy & Terms</h4>
                    <p style={{ cursor: "pointer" }} onClick={onClickLaw}>
                      개인정보처리방침{" "}
                    </p>
                    <p style={{ cursor: "pointer" }} onClick={onClickUse}>
                      이용약관
                    </p>
                  </div>
                </article>
                <div className={styles.e_line}>
                  <Image
                    src={copyright}
                    alt="copyright"
                    width={168}
                    height={15}
                  />
                </div>
                <article></article>
              </section>
            </div>
          </div>
        </Media>
      </MediaContextProvider>
    </>
  )
}
