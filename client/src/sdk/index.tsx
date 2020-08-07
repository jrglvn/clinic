import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import moment from "moment";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as Ui from "../components/common/styles";

export const parseServerDate = (date: number): string => {
  return moment(date, "x").format("DD.MM.YYYY hh:mm");
};

export const useClickOutside = (ref, onClickOutside, refExtra?) => {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (refExtra) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !refExtra.current.contains(event.target)
      ) {
        onClickOutside && onClickOutside();
      }
    } else if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside && onClickOutside();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

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

export const DatePickerField = ({ ...props }) => {
  const { setFieldValue, } = useFormikContext();
  const [field] = useField(props as any);
  return (
    <DatePicker
      {...field}
      {...props}
      dateFormat="dd.MM.yyyy"
      autocomplete="off"
      name="fake"
      selected={(field.value && new Date(field.value)) || new Date()}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export const MyInputField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props as any);
  return (
    <>
      <label htmlFor={field.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const MySelectField = (props) => {
  return <select>

  </select>;
};
