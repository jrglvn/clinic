import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { parseServerDate } from "../../../sdk";
import { Modal, useModal } from "../../../sdk";
import { QUERYAPPOINTMENTS, DELETEAPPOINTMENT } from "./gql";
import { AppointmentDetails } from "./AppointmentDetails";
import * as Ui from "../../common/styles";
import { FaCalendarPlus, FaCalendarMinus } from "react-icons/fa";

export const Appointments = (props) => {
  const { data, error, loading } = useQuery(QUERYAPPOINTMENTS);
  const [selectedAppointment, setSelectedAppointment] = useState<any>({});
  const { showModal, closeModal } = useModal();
  const [hoverItem, setHoverItem] = useState<number | null>(null);
  const [deleteAppointment, { error: mutationError }] = useMutation(
    DELETEAPPOINTMENT,
    {
      refetchQueries: [{ query: QUERYAPPOINTMENTS }],
      awaitRefetchQueries: true,
    }
  );

  return (
    <>
      {loading && <div>učitavanje dogovorenih termina...</div>}
      {!loading && (
        <Ui.NewItem
          onClick={() => {
            setSelectedAppointment(undefined);
            closeModal();
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
            closeModal();
          }}
          onMouseEnter={() => setHoverItem(appointment.id)}
          onMouseLeave={() => setHoverItem(null)}
        >
          <div>{parseServerDate(appointment.scheduled_for)}</div>
          <div>
            {`${appointment.client.first_name} ${appointment.client.last_name}`}
          </div>
          <div>{`${appointment.user.first_name} ${appointment.user.last_name}`}</div>
          <div>{appointment.category.name}</div>
          <div>{parseServerDate(appointment.created_at)}</div>
          <Ui.DeleteContainer
            showDeleteIcon={hoverItem === appointment.id}
            onClick={(e) => {
              e.stopPropagation();
              deleteAppointment({ variables: { id: appointment.id } });
            }}
          >
            <FaCalendarMinus />
          </Ui.DeleteContainer>
        </Ui.AppointmentsGrid>
      ))}
      <Modal showModal={showModal} closeModal={closeModal}>
        <AppointmentDetails
          appointment={selectedAppointment}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}
