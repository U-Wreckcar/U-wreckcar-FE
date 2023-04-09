/**
 * Styles
 */
import styles from "./CreateCategory.module.css"
import b_createutm from "assets/b_createutm.png"
import Image from "next/image"

export const CreateCategory = () => {
  const category = [
    "URL 입력 *",
    "소스 선택/입력 *",
    "미디움 선택/입력 * ",
    "캠페인 이름 입력 *",
    "캠페인 ID 입력",
    "캠페인 텀 입력",
    "캠페인 콘텐츠 입력",
    "메모 입력",
  ]

  return (
    <div className={styles.container_category}>
      <div className={styles.create_img_box}>
        <Image
          className={styles.b_createutm}
          src={b_createutm}
          alt='추가이미지'
        />
      </div>
      <div className={styles.utm_name}>
        {category.map((i, idx) => {
          return (
            <div key={idx}>
              <div className={styles.item}>
                <h3 className={styles.category_text}>{i}</h3>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
