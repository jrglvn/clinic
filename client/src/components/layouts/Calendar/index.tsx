import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {} from "../../../sdk";
import { Modal, useModal } from "../../../sdk";
import * as Ui from "../../common/styles";
import {} from "react-icons/fa";
import moment from "moment";

export const Calendar = (props) => {
  const { showModal, closeModal } = useModal();

  const currentDate = useMemo(() => {
    return { week: moment().week(), year: moment().year() };
  }, []);

  return (
    <>
      <Ui.Flex>
        trenutni tjedan {currentDate.week} / {moment().year()} godine
      </Ui.Flex>
      <Ui.Flex>
        <div>
          ponedjaljek
          {moment().day("monday").week(currentDate.week).format("DD.MM")}
        </div>
        <div>
          utorak
          {moment().day("tuesday").week(currentDate.week).format("DD.MM")}
        </div>
        <div>
          srijeda
          {moment().day("wednesday").week(currentDate.week).format("DD.MM")}
        </div>
        <div>
          četvrtak
          {moment().day("thursday").week(currentDate.week).format("DD.MM")}
        </div>
        <div>
          petak {moment().day("friday").week(currentDate.week).format("DD.MM")}
        </div>
      </Ui.Flex>
      <Modal showModal={showModal} closeModal={closeModal}></Modal>
    </>
  );
};
