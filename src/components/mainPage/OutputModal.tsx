import outputImg from 'assets/outputGroup.png';
import Image from 'next/image';

export const OutputModal = () => {
  return (
    <>
      <Image width={466} height={100} alt="outputmodal" src={outputImg} />
    </>
  );
};
