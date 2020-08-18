import { gql } from "@apollo/client";

export const QUERYAPPOINTMENTS = gql`
  query QUERYAPPOINTMENTS {
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

export const QUERYALL = gql`
  query QUERYALL {
    users {
      getUsers {
        id
        first_name
        last_name
        email
        role
        assigned_categories {
          id
          name
        }
      }
    }
    clients {
      id
      first_name
      last_name
      email
      address
      phone_number
    }
    categories {
      id
      name
    }
  }
`;

export const CREATEAPPOINTMENT = gql`
  mutation CREATEAPPOINTMENT($input: AppointmentInput!) {
    appointments {
      createAppointment(input: $input) {
        id
        user {
          id
          first_name
          last_name
        }
        client {
          id
          first_name
          last_name
        }
        category {
          id
          name
        }
        previous_appointment {
          id
        }
        created_at
        scheduled_for
      }
    }
  }
`;

export const UPDATEAPPOINTMENT = gql`
  mutation UPDATEAPPOINTMENT($id: ID!, $input: AppointmentInput!) {
    appointments {
      updateAppointment(id: $id, input: $input) {
        id
        user {
          id
        }
        client {
          id
        }
        category {
          id
        }
        created_at
        scheduled_for
        result
        previous_appointment {
          id
        }
      }
    }
  }
`;
