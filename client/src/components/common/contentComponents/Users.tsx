import React, { useState, useEffect } from "react";
import * as Ui from "../../styles";
import { useQuery, gql } from "@apollo/client";
import { MainComponent } from "../../index";

export const Users = (props) => {
  const { data, error, loading } = useQuery(QUERYUSERS);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data) return null;

  return (
    <Ui.FlexColumn>
      users
      {/* {data?.users?.getUsers.map((user) => (
        <div>{user.first_name}</div>
      ))} */}
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
