import React, { useEffect } from "react";
import * as Ui from "../common/styles";
import { useQuery, gql } from "@apollo/client";
import { MainComponent } from "../common/MainComponent";

export const Users = (props) => {
  const { data, error, loading } = useQuery(QUERYUSERS);

  return (
    <Ui.UsersContainer>
      {loading && <div>loading users...</div>}
      {data?.users?.getUsers.map((user) => (
        <Ui.UsersGrid key={user.id}>
          <div>{user.first_name}</div>
          <div>{user.last_name}</div>
          <div>{user.email}</div>
          <div>{user.role}</div>
        </Ui.UsersGrid>
      ))}
    </Ui.UsersContainer>
  );
};

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
