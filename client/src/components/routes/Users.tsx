import React, { useEffect } from "react";
import * as Ui from "../common/styles";
import { useQuery, gql } from "@apollo/client";
import { MainComponent } from "../common/MainComponent";

export const Users = (props) => {
  const { data, error, loading } = useQuery(QUERYUSERS);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Ui.FlexColumn>
      {loading && <div>loading users...</div>}
      <Ui.UsersGrid>
        {data?.users?.getUsers.map((user) => (
          <>
            <div>{user.first_name}</div>
            <div>{user.last_name}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
          </>
        ))}
      </Ui.UsersGrid>
    </Ui.FlexColumn>
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
