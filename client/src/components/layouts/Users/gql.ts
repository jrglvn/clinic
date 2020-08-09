import { gql } from "@apollo/client";

export const QUERYUSERS = gql`
  query queryUsers {
    users {
      getUsers {
        id
        first_name
        last_name
        email
        role
      }
    }
  }
`;
