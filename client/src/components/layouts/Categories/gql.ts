import { gql } from "@apollo/client";

export const QUERYCATEGORIES = gql`
  query QUERYCATEGORIES {
    categories {
      id
      name
    }
  }
`;

export const UPDATECATEGORY = gql`
  mutation UPDATECATEGORY($id: ID!, $input: CategoryInput!) {
    categories {
      updateCategory(id: $id, input: $input) {
        id
        name
      }
    }
  }
`;

export const CREATECATEGORY = gql`
  mutation CREATECATEGORY($input: CategoryInput!) {
    categories {
      createCategory(input: $input) {
        id
        name
      }
    }
  }
`;

export const DELETECATEGORY = gql`
  mutation DELETECATEGORY($id: ID!) {
    categories {
      deleteCategory(id: $id)
    }
  }
`;
