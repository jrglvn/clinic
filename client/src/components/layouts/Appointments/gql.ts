import { gql } from "@apollo/client";

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
