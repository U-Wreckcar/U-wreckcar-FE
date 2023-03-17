import Image from 'next/image';
import ReactModal from 'react-modal';
import styles from './main.module.css';
import b_close from 'assets/b_close.png';
import { useRef } from 'react';
type EditModalType = {
  isOpen: boolean;
  onRequestClose: any;
  style: any;
  value: string;
  table: any;
  index: string;
};
export const EditModal: React.FC<EditModalType> = ({
  isOpen,
  onRequestClose,
  style,
  value,
  table,
  index,
}) => {
  const textarea_ref = useRef<HTMLTextAreaElement>(null);
  //수정하기
  const onClickEditButton = () => {
    const id = index.split('_')[0];
    const filter = table
      .getGroupedRowModel()
      .flatRows.filter((row: any) => row.index.toString() === id)[0].original;

    console.log(filter);
    console.log(textarea_ref?.current?.value);
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <div className={styles.del_dialogBox}>
        <div className={styles.header}>
          <div className={styles.title_box}>
            <span className={styles.title}>UTM 메모 수정하기</span>
          </div>
          <div className={styles.cancleBtn_box}>
            <button className={styles.cancleBtn} onClick={onRequestClose}>
              <Image src={b_close} alt="close_img" width={24} height={24} />
            </button>
          </div>
        </div>
        <div className={styles.contents}>
          <div className={styles.col_box}>
            <textarea
              ref={textarea_ref}
              defaultValue={value}
              className={styles.main_area}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <button
            onClick={onRequestClose}
            className={styles.modal_del_button}
            value="default"
          >
            취소하기
          </button>
          <button
            onClick={onClickEditButton}
            className={styles.modal_button}
            value="default"
          >
            수정하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
