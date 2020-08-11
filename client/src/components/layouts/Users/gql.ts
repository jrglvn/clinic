import { gql } from "@apollo/client";

export const QUERYUSERS = gql`
  query queryUsers {
    users {
      getUsers {
        id
        first_name
        last_name
        email
        address
        phone_number
        role
        assigned_categories {
          id
          name
        }
      }
    }
  }
`;

export const UPDATEUSER = gql`
  mutation UPDATEUSER($id: ID!, $input: UserInput!) {
    users {
      updateUser(id: $id, input: $input) {
        id
        first_name
        last_name
        email
        address
        phone_number
        role
        assigned_categories {
          id
          name
        }
      }
    }
  }
`;

export const CREATEUSER = gql`
  mutation CREATEUSER($input: UserInput!) {
    users {
      createUser(input: $input) {
        id
        first_name
        last_name
        email
        address
        phone_number
        role
        assigned_categories {
          id
          name
        }
      }
    }
  }
`;

export const DELETEUSER = gql`
  mutation DELETEUSER($id: ID!) {
    users {
      deleteUser(id: $id)
    }
  }
`;
