import React, { useEffect, useState } from "react";
import * as Ui from "../../common/styles";
import { useQuery, useMutation } from "@apollo/client";
import { QUERYCATEGORIES } from "./gql";
import { Modal, useModal } from "../../../sdk";
import {} from "./";
import { Category } from "../common/types";
import { FaTrash } from "react-icons/fa";

export const Categories = (props) => {
  const { data, error: queryError, loading } = useQuery(QUERYCATEGORIES);
  const { showModal, toggleModal } = useModal();
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [hoverItem, setHoverItem] = useState<number | null>(null);
  // const [deleteCategory, { error: mutationError }] = useMutation(DELETECLIENT, {
  //   refetchQueries: [{ query: QUERYCLIENTS }],
  //   awaitRefetchQueries: true,
  // });

  if (queryError) return <div>apollo error</div>;

  return (
    <Ui.BasicLayout>
      {loading && <div>loading clients...</div>}
      {data?.categories?.map((category) => (
        <Ui.CategoriesGrid
          key={category.id}
          onClick={() => {
            setSelectedCategory(category);
            toggleModal();
          }}
          onMouseEnter={() => setHoverItem(category.id)}
          onMouseLeave={() => setHoverItem(null)}
        >
          <div>{category.name}</div>
          <Ui.DeleteContainer
            showDeleteIcon={hoverItem === category.id}
            onClick={(e) => {
              e.stopPropagation();
              // deleteClient({ variables: { id: client.id } });
            }}
          >
            <FaTrash />
          </Ui.DeleteContainer>
        </Ui.CategoriesGrid>
      ))}
    </Ui.BasicLayout>
  );
};
