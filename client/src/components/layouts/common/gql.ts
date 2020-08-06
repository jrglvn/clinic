import { gql } from "@apollo/client";

export const QUERYUSERS = gql`
  query QUERYUSERS {
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
  }
`;

export const QUERYCLIENTS = gql`
  query QUERYCLIENTS {
    clients {
      id
      first_name
      last_name
      email
      address
      phone_number
    }
  }
`;

export const QUERYCATEGORIES = gql`
  query QUERYCATEGORIES {
    categories {
      id
      name
    }
  }
`;
