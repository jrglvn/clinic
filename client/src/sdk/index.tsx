import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import moment from "moment";
import { useField, useFormikContext, Field, FieldProps } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as Ui from "../components/common/styles";
import { FaWindowClose } from "react-icons/fa";

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
          <Ui.ModalContainer ref={modalRef as any}>
            <Ui.ModalHeader>
              <FaWindowClose size={"1.5rem"} onClick={() => toggleModal()} />
            </Ui.ModalHeader>
            <Ui.ModalContent>{children}</Ui.ModalContent>
          </Ui.ModalContainer>
        </Ui.Modal>,
        document.getElementById("portal") as any
      )
    : null;
};

export const MyDatePickerField = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field, { touched, error }] = useField(props as any);
  return (
    <>
      <DatePicker
        {...field}
        {...props}
        dateFormat="dd.MM.yyyy"
        autocomplete="off"
        selected={(field.value && new Date(field.value)) || new Date()}
        onChange={(val) => {
          console.log("datepicker: ", val);
          setFieldValue(field.name, val);
        }}
      />
      {error && touched && <div>{error}</div>}
    </>
  );
};

export const MySelectField = (props: {
  name: string;
  label?: string;
  options: Array<{ value: string; label: string }>;
  onChange?: (any) => any;
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, { touched, error }] = useField(props as any);

  return (
    <>
      <label htmlFor={field.name}>{props.label || props.name}</label>
      <Field
        name={props.name}
        as="select"
        onChange={(e) => {
          console.log(e.target.value);
          props.onChange && props.onChange(e.target.value);
          setFieldValue(props.name, e.target.value);
        }}
      >
        {props.options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Field>
      {touched && error && <div>{error}</div>}
    </>
  );
};

export const MyInputField = (props: { name: string; label: string }) => {
  const [field, meta] = useField(props as any);
  return (
    <>
      <label htmlFor={field.name}>{props.label || field.name}</label>
      <input {...field} {...props} value={field.value} autoComplete="none" />
      {meta.touched && meta.error ? (
        <div className="error" style={{ color: "red", fontSize: ".75rem" }}>
          {meta.error}
        </div>
      ) : null}
    </>
  );
};
