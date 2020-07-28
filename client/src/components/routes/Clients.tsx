import React, { useState, useEffect } from "react";
import * as Ui from "../common/styles";
import { useQuery, gql } from "@apollo/client";
import { MainComponent } from "../common/MainComponent";

export const Clients = (props) => {
  const { data, error, loading } = useQuery(QUERYCLIENTS);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Ui.FlexColumn>
      {loading && <div>loading clients...</div>}
      {data?.users?.getUsers.map((user) => (
        <div>{user.first_name}</div>
      ))}
    </Ui.FlexColumn>
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
