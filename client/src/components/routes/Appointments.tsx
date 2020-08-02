import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Formik, Field } from "formik";
import { parseServerDate } from "../../sdk";
import { Modal, useModal } from "../../sdk";
import * as Ui from "../common/styles";

export const Appointments = (props) => {
  const { data, error, loading } = useQuery(QUERYAPPOINTMENTS);
  const [selectedAppointment, setSelectedAppointment] = useState<any>({});
  const { showModal, toggleModal } = useModal();

  return (
    <Ui.AppointmentsContainer>
      {loading && <div>loading appointments...</div>}
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
        <AppointmentDetails appointment={selectedAppointment} />
      </Modal>
    </Ui.AppointmentsContainer>
  );
};

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const AppointmentDetails = (props) => {
  return (
    <Ui.AppointmentDetails>
      <Formik
        initialValues={{
          firstName: props.appointment.client.first_name,
          lastName: props.appointment.client.last_name,
          email: props.appointment.client.email,
        }}
        onSubmit={() => {}}
      >
        <Ui.Form>
          <label htmlFor="firstName">ime</label>
          <Field id="firstName" name="firstName" placeholder="" />

          <label htmlFor="lastName">prezime</label>
          <Field id="lastName" name="lastName" placeholder="" />

          <label htmlFor="email">email</label>
          <Field id="email" name="email" placeholder="" type="email" />

          <Field options={[{ label: "test" }]} />

          <button type="submit">Submit</button>
        </Ui.Form>
      </Formik>
    </Ui.AppointmentDetails>
  );
};

export const QUERYAPPOINTMENTS = gql`
  query queryAppointments {
    appointments {
      id
      user {
        id
        first_name
        last_name
        email
        role
      }
      client {
        id
        first_name
        last_name
        email
        address
        phone_number
      }
      category {
        id
        name
      }
      created_at
      scheduled_for
      previous_appointment {
        id
      }
    }
  }
`;
