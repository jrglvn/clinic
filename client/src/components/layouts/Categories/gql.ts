import { gql } from "@apollo/client";

export const QUERYCATEGORIES = gql`
  query QUERYCATEGORIES {
    categories {
      id
      name
    }
  }
`;
