import Image from 'next/image';
import ReactModal from 'react-modal';
import styles from './main.module.css';

import notion from 'assets/notion.png';
import sheet from 'assets/sheet.png';
import execel from 'assets/execel.png';
import { useEffect, useRef, useState } from 'react';

type OutputModalType = {
  isOpen: boolean;
  onRequestClose: any;
  style: any;
  data: any;
};
export const OutputModal: React.FC<OutputModalType> = ({
  isOpen,
  onRequestClose,
  style,
  data,
}) => {
  const [click, setClick] = useState(false);
  const execel_ref = useRef<HTMLDivElement>(null);
  const onClickPopHandler = () => {
    console.log(data);
  };

  useEffect(() => {
    if (click && execel_ref) {
      console.log(execel_ref?.current);
    }
  }, [click]);

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <div
        className={styles.dialogBox}
        {...(isOpen && true ? { open: true } : {})}
        id="favDialog"
      >
        <div className={styles.header}>
          <div className={styles.title_box}>
            <span className={styles.title}>UTM 추출하기</span>
          </div>
          <div className={styles.cancleBtn_box}>
            <button className={styles.cancleBtn} onClick={onRequestClose}>
              X
            </button>
          </div>
        </div>
        <div className={styles.contents}>
          <div className={styles.col_box}>
            <div>
              <h5>{data.length}개의 UTM이 선택되었습니다.</h5>
              <h5>UTM 데이터를 보낼 틀을 선택해주세요</h5>
            </div>
            <div className={styles.img_box}>
              <div className={styles.img_box_img}>
                <Image
                  width={150}
                  height={100}
                  alt="outputmodal"
                  src={notion}
                  onClick={() => alert('개발 중입니다...!')}
                />
              </div>
              <div className={styles.img_box_img}>
                <Image
                  width={150}
                  height={100}
                  alt="outputmodal"
                  src={sheet}
                  onClick={() => alert('개발 중입니다...!')}
                />
              </div>
              {click ? (
                <div
                  onClick={() => setClick(!click)}
                  ref={execel_ref}
                  className={styles.img_box_img_blue}
                >
                  <Image
                    width={150}
                    height={100}
                    alt="outputmodal"
                    src={execel}
                  />
                </div>
              ) : (
                <div
                  onClick={() => setClick(!click)}
                  ref={execel_ref}
                  className={styles.img_box_img}
                >
                  <Image
                    width={150}
                    height={100}
                    alt="outputmodal"
                    src={execel}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <button
            onClick={onClickPopHandler}
            className={styles.modal_button}
            value="default"
          >
            추출하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
