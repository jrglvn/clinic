import { gql } from "@apollo/client";

export const QUERYCLIENTS = gql`
  query queryClients {
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

export const UPDATECLIENT = gql`
  mutation UPDATECLIENT($id: ID!, $input: ClientInput!) {
    clients {
      updateClient(id: $id, input: $input) {
        id
        first_name
        last_name
        email
        address
        phone_number
      }
    }
  }
`;

export const CREATECLIENT = gql`
  mutation CREATECLIENT($input: ClientInput!) {
    clients {
      createClient(input: $input) {
        id
        first_name
        last_name
        email
        address
        phone_number
      }
    }
  }
`;

export const DELETECLIENT = gql`
  mutation DELETECLIENT($id: ID!) {
    clients {
      deleteClient(id: $id)
    }
  }
`;
