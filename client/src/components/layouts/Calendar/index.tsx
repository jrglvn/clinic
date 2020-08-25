import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERYWEEKAPPOINTMENTS } from "./gql";
import { Appointment } from "../common/types";
import {
  Modal,
  useModal,
  parseServerDate,
  parseServerDateToTime,
} from "../../../sdk";
import * as Ui from "../../common/styles";
import { FaStepForward, FaStepBackward, FaUndo } from "react-icons/fa";
import moment from "moment";

const daysOfWeek = {
  Monday: "ponedjeljak",
  Tuesday: "utorak",
  Wednesday: "srijeda",
  Thursday: "četvrtak",
  Friday: "petak",
  //  saturday: "subota",
};

export const Calendar = (props) => {
  const { showModal, closeModal } = useModal();
  const [date, setDate] = useState(moment());
  const { data, error: queryError, loading } = useQuery(QUERYWEEKAPPOINTMENTS, {
    variables: { input: { year: date.year(), week: date.week() } },
  });

  console.log("novi datum: ", date.toString());

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
        {Object.keys(daysOfWeek).map((day) => {
          console.log(
            "object keys: ",
            day,
            " / ",
            date.format("dddd"),
            date.toString()
          );
          return (
            <div
              is-selected={day === date.format("dddd") ? "true" : "false"}
              key={day}
              onClick={() => setDate(date.clone().day(day))}
            >
              <div>{daysOfWeek[day]}</div>
              <div>{date.day(day).week(date.week()).format("DD.MM")}</div>
            </div>
          );
        })}
      </Ui.WeekInfo>
      <div>
        {data?.appointments?.appointmentsForWeek?.map((appointment) => (
          <div key={appointment.id}>
            {parseServerDateToTime(appointment.scheduled_for)}{" "}
            {appointment.user.first_name}
          </div>
        ))}
      </div>
      <Modal showModal={showModal} closeModal={closeModal}></Modal>
    </>
  );
};
