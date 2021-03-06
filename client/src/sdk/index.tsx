import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import moment from "moment";
import { useField, useFormikContext, Field, FieldProps } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Ui from "../components/common/styles";
import { FaWindowClose } from "react-icons/fa";
import Select from "react-select";
export { Table } from "./Table";

export const parseServerDate = (date: string): string => {
  return moment(date, "x").format("DD.MM.YYYY HH:mm");
};

export const parseServerDateToTime = (date: string): string => {
  return moment(date, "x").format("HH:mm");
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

  function closeModal() {
    setShowModal(!showModal);
  }

  return {
    showModal,
    closeModal,
  };
};

interface IModalProps {
  showModal: boolean;
  closeModal: () => any;
  children?: React.ReactNode;
}

export const Modal = ({ showModal, closeModal, children }: IModalProps) => {
  const modalRef = useRef<any>();
  useClickOutside(modalRef, closeModal);

  useEffect(() => {
    modalRef?.current?.focus();
  }, [modalRef]);

  return showModal
    ? createPortal(
        <Ui.Modal>
          <Ui.ModalContainer
            ref={modalRef as any}
            tabIndex={-1}
            onKeyDown={(e) => e.key === "Escape" && closeModal()}
          >
            <Ui.ModalHeader>
              <FaWindowClose size={"1.5rem"} onClick={() => closeModal()} />
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

  console.log(
    "sdk/mdp, new Date(field.value): ",
    field.value && new Date(field.value),
    " field.value: ",
    field.value
  );

  return (
    <>
      <label htmlFor={props.name}>{props.label || props.name}</label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || new Date()}
        onChange={(val) => {
          console.log("date picker, onchange: ", val);
          setFieldValue(field.name, val);
        }}
        showTimeSelect
        timeIntervals={15}
        dateFormat="dd.MM.y HH:mm"
        timeFormat="HH:mm"
        autoComlete="new-password"
      />
      {error && touched && <Ui.Error>{error}</Ui.Error>}
    </>
  );
};

// export const MySelectField = (props: {
//   name: string;
//   label?: string;
//   options: Array<{ value: string; label: string }>;
//   onChange?: (any) => any;
// }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, { touched, error }] = useField(props as any);

//   return (
//     <>
//       <label htmlFor={field.name}>{props.label || props.name}</label>
//       <Field
//         name={props.name}
//         as="select"
//         onChange={(e) => {
//           props.onChange && props.onChange(e.target.value);
//           setFieldValue(props.name, e.target.value);
//         }}
//       >
//         {props.options?.map((o) => (
//           <option key={o.value} value={o.value}>
//             {o.label}
//           </option>
//         ))}
//       </Field>
//       {touched && error && <div>{error}</div>}
//     </>
//   );
// };

export const MyInputField = (props: { name: string; label: string } & any) => {
  const [field, meta] = useField(props as any);
  return (
    <>
      <label htmlFor={field.name}>{props.label || field.name}</label>
      <input
        {...field}
        {...props}
        value={field.value || ""}
        autoComplete="off"
      />
      {meta.touched && meta.error ? (
        <div className="error" style={{ color: "red", fontSize: ".75rem" }}>
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const MyCheckboxField = (props: {
  name: string;
  options?: Array<{ value: string; label: string }>;
}) => {
  const [field, { touched, error }] = useField(props as any);
  return (
    <Ui.MyCheckboxField>
      {props.options?.map((o) => (
        <Ui.Checkbox key={o.value}>
          <Field type="checkbox" name={props.name} value={o.value} />
          {o.label}
        </Ui.Checkbox>
      ))}
    </Ui.MyCheckboxField>
  );
};

export const MySelect = (
  props: {
    name: string;
    label?: string;
    options: Array<{ value: string; label: string }>;
    onChange?: (any) => any;
  } & any
) => {
  const { setFieldValue } = useFormikContext();
  const [{ value }, { error, touched }] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>{props.label || props.name}</label>
      <Select
        value={props.options?.filter((option) => option.value === value)}
        {...props}
        id={props.name}
        onChange={(e: any) => {
          props.onChange && props.onChange(e.value);
          setFieldValue(props.name, e.value);
        }}
      />
      {error && touched && <Ui.Error>{error}</Ui.Error>}
    </>
  );
};
