import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "../../sdk";

import * as Ui from "./styles";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return {
    showModal,
    toggleModal,
  };
};

interface IModalProps {
  showModal: boolean;
  toggleModal: () => any;
  children?: React.ReactNode;
}

export const Modal = ({ showModal, toggleModal, children }: IModalProps) => {
  const modalRef = useRef<any>();
  useClickOutside(modalRef, toggleModal);

  // useEffect(() => {
  //   if (isShowing) {
  //     const temp = document.body.style.overflow;
  //     document.body.style.overflow = "hidden";
  //     return function cleanup() {
  //       document.body.style.overflow = temp;
  //     };
  //   }
  // }, [isShowing]);

  return showModal
    ? createPortal(
        <Ui.Modal>
          <Ui.ModalContent ref={modalRef as any}>{children}</Ui.ModalContent>
        </Ui.Modal>,
        document.body
      )
    : null;
};
