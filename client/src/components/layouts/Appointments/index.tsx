import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { parseServerDate } from "../../../sdk";
import { Modal, useModal } from "../../../sdk";
import { QUERYAPPOINTMENTS } from "./gql";
import { AppointmentDetails } from "./AppointmentDetails";
import * as Ui from "../../common/styles";
import { FaCalendarPlus } from "react-icons/fa";

export const Appointments = (props) => {
  const { data, error, loading } = useQuery(QUERYAPPOINTMENTS);
  const [selectedAppointment, setSelectedAppointment] = useState<any>({});
  const { showModal, toggleModal } = useModal();

  return (
    <Ui.BasicLayout>
      {loading && <div>učitavanje dogovorenih termina...</div>}
      {!loading && (
        <Ui.NewItem
          onClick={() => {
            setSelectedAppointment(undefined);
            toggleModal();
          }}
        >
          <FaCalendarPlus />
        </Ui.NewItem>
      )}
      {data?.appointments?.map((appointment) => (
        <Ui.AppointmentsGrid
          key={appointment.id}
          onClick={() => {
            setSelectedAppointment(appointment);
            toggleModal();
          }}
        >
          <div>{parseServerDate(appointment.scheduled_for)}</div>
          <div>
            {`${appointment.client.first_name} ${appointment.client.last_name}`}
          </div>
          <div>{`${appointment.user.first_name} ${appointment.user.last_name}`}</div>
          <div>{appointment.category.name}</div>
          <div>{parseServerDate(appointment.created_at)}</div>
        </Ui.AppointmentsGrid>
      ))}
      <Modal showModal={showModal} toggleModal={toggleModal}>
        <AppointmentDetails
          appointment={selectedAppointment}
          toggleModal={toggleModal}
        />
      </Modal>
    </Ui.BasicLayout>
  );
};

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}
