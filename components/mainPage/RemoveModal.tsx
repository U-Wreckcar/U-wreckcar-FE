import React from 'react';
import ReactModal from 'react-modal';

type ModalType = {
  isOpen: any;
  onRequestClose: any;
  style: any;
};

export const RemoveModal: React.FC<ModalType> = ({
  isOpen,
  onRequestClose,
  style,
}) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <div></div>
    </ReactModal>
  );
};
