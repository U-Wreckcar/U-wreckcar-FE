import React from "react"
import styles from "./ShortenModal.module.css"
type setShortenCopytype = {
  setShortenCopy: any
}
const ShortenModal: React.FC<setShortenCopytype> = ({ setShortenCopy }) => {
  return (
    <div className={styles.container}>
      <h1>Shorten URL이 복사되었습니다!</h1>
      <p className={styles.text}>
        ※ 주의사항:
        <br />
        Shorten URL을 사용하실 때 일반적인 경우 문제없이 UTM 파라미터 정보가
        수집되나,
        <br /> 드물게 URL을 변환하는 과정에서 UTM 파라미터가 유실되는 문제가
        발생하기도 합니다.
        <br />
        따라서 파라미터 트래킹이 잘 되는지 테스트를 거쳐 사용하시고,
        <br />
        급하시다면 전체 UTM을 사용하시는 것을 권장드립니다.
      </p>
      <button
        className={styles.button}
        onClick={() => {
          setShortenCopy(false)
        }}>
        확인
      </button>
    </div>
  )
}
export default ShortenModal
