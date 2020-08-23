import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERYWEEKAPPOINTMENTS } from "./gql";
import { Appointment } from "../common/types";
import { Modal, useModal, parseServerDate } from "../../../sdk";
import * as Ui from "../../common/styles";
import { FaStepForward, FaStepBackward, FaUndo } from "react-icons/fa";
import moment from "moment";

export const Calendar = (props) => {
  const { showModal, closeModal } = useModal();
  const [date, setDate] = useState(moment());
  const { data, error: queryError, loading } = useQuery(QUERYWEEKAPPOINTMENTS, {
    variables: { input: { year: date.year(), week: date.week() } },
  });

  return (
    <>
      <Ui.WeekSelector>
        <FaStepBackward
          onClick={() => setDate((date) => date.clone().subtract(1, "week"))}
        />
        <div>
          tjedan {date.week()} / {date.year()} godine
        </div>
        <FaStepForward onClick={() => setDate(date.clone().add(1, "week"))} />
        <FaUndo onClick={() => setDate(moment())} />
      </Ui.WeekSelector>
      <Ui.WeekInfo>
        <div>
          <div>ponedjeljak</div>
          <div>{date.day("monday").week(date.week()).format("DD.MM")}</div>
        </div>
        <div>
          <div>utorak</div>
          <div>{date.day("tuesday").week(date.week()).format("DD.MM")} </div>
        </div>
        <div>
          <div>srijeda</div>
          <div>{date.day("wednesday").week(date.week()).format("DD.MM")}</div>
        </div>
        <div>
          <div>četvrtak</div>
          <div>{date.day("thursday").week(date.week()).format("DD.MM")}</div>
        </div>
        <div>
          <div>petak</div>
          <div>{date.day("friday").week(date.week()).format("DD.MM")}</div>
        </div>
      </Ui.WeekInfo>
      <div>
        {data?.appointments?.appointmentsForWeek?.map((appointment) => (
          <div>
            {appointment.user.first_name}{" "}
            {parseServerDate(appointment.scheduled_for)}
          </div>
        ))}
      </div>
      <Modal showModal={showModal} closeModal={closeModal}></Modal>
    </>
  );
};
