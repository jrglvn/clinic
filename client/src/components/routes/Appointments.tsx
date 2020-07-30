import React, { useEffect } from "react";
import * as Ui from "../common/styles";
import { useQuery, gql } from "@apollo/client";
import { parseServerDate } from "../../sdk";

export const Appointments = (props) => {
  const { data, error, loading } = useQuery(QUERYAPPOINTMENTS);

  return (
    <Ui.AppointmentsContainer>
      {loading && <div>loading appointments...</div>}
      {data?.appointments?.map((appointment) => (
        <Ui.AppointmentsGrid key={appointment.id}>
          <div>{parseServerDate(appointment.scheduled_for)}</div>
          <div>
            {`${appointment.client.first_name} ${appointment.client.last_name}`}
          </div>
          <div>{`${appointment.user.first_name} ${appointment.user.last_name}`}</div>
          <div>{appointment.category.name}</div>
          <div>{parseServerDate(appointment.created_at)}</div>
        </Ui.AppointmentsGrid>
      ))}
    </Ui.AppointmentsContainer>
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
