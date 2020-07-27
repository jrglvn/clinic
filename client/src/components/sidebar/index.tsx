import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERYUSERS } from "./gql";

export const Sidebar = (props) => {
  const { data, error, loading } = useQuery(QUERYUSERS);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data) return null;

  return <></>;
};
