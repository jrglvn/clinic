import React, { useEffect } from "react";
import * as Ui from "../common/styles";
import { useQuery, gql } from "@apollo/client";

export const Clients = (props) => {
  const { data, error, loading } = useQuery(QUERYCLIENTS);

  return (
    <Ui.ClientsContainer>
      {loading && <div>loading users...</div>}
      {data?.clients?.map((client) => (
        <Ui.ClientsGrid key={client.id}>
          <div>{`${client.first_name} ${client.last_name}`}</div>
          <div>{client.email}</div>
          <div>{client.address}</div>
          <div>{client.phone_number}</div>
        </Ui.ClientsGrid>
      ))}
    </Ui.ClientsContainer>
  );
};

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
