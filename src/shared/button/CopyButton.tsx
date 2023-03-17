import { Alert } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import check from 'assets/icons.png';

type CopyButtonProps = {
  text: string;
};

//style 속성 프롭스 no

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [alert, setAlert] = useState(false);

  const onClickCopyBtn = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setAlert(true);
      });
    }
  };
  return (
    <>
      {alert && (
        <div
          onClick={() => {
            setAlert(false);
          }}
        >
          <div>
            <Image src={check} width={25} height={25} alt="check" />
            <div>
              <h5>성공</h5> <p>UTM이 복사되었습니다!</p>
            </div>
          </div>
          <button>X</button>
        </div>
      )}
      <button onClick={onClickCopyBtn}>복사하기</button>
    </>
  );
};
