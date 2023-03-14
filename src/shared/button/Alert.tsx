import { SetStateAction, Dispatch } from 'react';
import styles from './styles.module.css';

type AlertProps = {
  setAlert: Dispatch<SetStateAction<boolean>>;
};

export const Alert: React.FC<AlertProps> = ({ setAlert }) => {
  return (
    <div className={styles.alert}>
      <div
        onClick={() => {
          setAlert(false);
        }}
      >
        클립보드에 복사되었습니다.
      </div>
    </div>
  );
};
