import { gql } from "@apollo/client";

export const QUERYWEEKAPPOINTMENTS = gql`
  query QUERYWEEKAPPOINTMENTS($input: AppointmentsWeekInput!) {
    appointments {
      appointmentsForWeek(input: $input) {
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
  }
`;
