import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {} from "../../../sdk";
import { Modal, useModal } from "../../../sdk";
import * as Ui from "../../common/styles";
import {} from "react-icons/fa";

export const Calendar = (props) => {
  const { showModal, closeModal } = useModal();

  return (
    <Ui.BasicLayout>
      <Modal showModal={showModal} closeModal={closeModal}></Modal>
    </Ui.BasicLayout>
  );
};

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}
