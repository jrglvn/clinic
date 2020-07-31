import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { parseServerDate } from "../../sdk";
import { Modal, useModal } from "../common/Modal";
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
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />

          <button type="submit">Submit</button>
        </Form>
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
