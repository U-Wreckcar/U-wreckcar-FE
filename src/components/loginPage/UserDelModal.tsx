import Modal from "@/app/Modal"
import { removeUser } from "@/util/async/api"
import { useRef, useState } from "react"
import styles from "./delModal.module.css"

const UserDelModal = ({ isOpen, onRequestClose }: any) => {
  const [check, setCheck] = useState<string | undefined>("")
  const etc_ref = useRef<HTMLInputElement>(null)

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
    },
  }

  const categoryList = [
    { reason: " 새로운 계정으로 가입하고 싶어요." },
    { reason: "  기록을 삭제하고 싶어요." },
    { reason: " 사용 빈도가 낮아요." },
    { reason: "  서비스 이용이 어려워요." },
    { reason: " 더 좋은 서비스를 찾았어요." },
  ]

  const removeUserHandler = async () => {
    try {
      await removeUser({ data: { reason: check } })
      onRequestClose
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <div className={styles.container}>
        <div className={styles.underline}>회원 탈퇴</div>
        <div className={styles.wrap}>
          <div>
            <h2>
              정말 떠나시는 건가요?
              <br></br>한 번만 다시 생각해 주세요!
            </h2>
            <div className={styles.wrap_underLine}>
              <p>
                탈퇴하시려는 이유를 말씀해주세요
                <br></br>더 나은 프로덕트를 만들기 위한 자료로 활용하겠습니다.
              </p>
            </div>

            <div className={styles.input_box_wrap}>
              {categoryList.map((category) => {
                return (
                  <div key={category.reason} className={styles.input_box}>
                    <label>
                      <input
                        type="checkbox"
                        id={category.reason}
                        onChange={(e) => {
                          setCheck(e.target.id)
                        }}
                      ></input>
                      {category.reason}
                    </label>
                  </div>
                )
              })}

              <div className={styles.input_box}>
                <label>
                  <input
                    type="checkbox"
                    id="기타"
                    onChange={() => {
                      setCheck(etc_ref.current?.value)
                    }}
                  ></input>
                  기타
                </label>
                <input
                  ref={etc_ref}
                  type="text"
                  className={styles.other_input}
                  placeholder="이유를 간단히 입력해주세요."
                ></input>
              </div>
            </div>
          </div>
          <div className={styles.bottom_box}>
            <div className={styles.bottom_underLine_box}>
              <h6>서비스 탈퇴 안내사항</h6>
            </div>
            <span>
              탈퇴 후 회원님의 개인 정보와 UTM 데이터는 모두 삭제됩니다.
              <br></br>
              삭제된 정보와 데이터는 복구할 수 없으니 신중하게 결정해 주세요.
              <br></br>
              업무용 계쩡을 탈퇴하신 경우에도 복구 관련하여 책임을지지 않습니다.
            </span>
          </div>
          <div className={styles.button_box}>
            <button
              className={styles.out_button}
              onClick={() => removeUserHandler()}
            >
              탈퇴하기
            </button>
            <button className={styles.cancel_button} onClick={onRequestClose}>
              취소하기
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default UserDelModal
