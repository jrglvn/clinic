import React, { useEffect, useState } from "react";
import * as Ui from "../../common/styles";
import { useQuery, useMutation } from "@apollo/client";
import { QUERYCATEGORIES, DELETECATEGORY } from "./gql";
import { Modal, useModal } from "../../../sdk";
import { CategoryDetails } from "./CategoryDetails";
import { Category } from "../common/types";
import { FaTrash, FaPlus } from "react-icons/fa";

export const Categories = (props) => {
  const { data, error: queryError, loading } = useQuery(QUERYCATEGORIES);
  const { showModal, toggleModal } = useModal();
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [hoverItem, setHoverItem] = useState<number | null>(null);
  const [deleteCategory, { error: mutationError }] = useMutation(
    DELETECATEGORY,
    {
      refetchQueries: [{ query: QUERYCATEGORIES }],
      awaitRefetchQueries: true,
    }
  );

  if (queryError) return <div>apollo error</div>;

  return (
    <Ui.BasicLayout>
      {loading && <div>loading clients...</div>}
      {!loading && (
        <Ui.NewItem
          onClick={() => {
            setSelectedCategory(undefined);
            toggleModal();
          }}
        >
          <FaPlus />
        </Ui.NewItem>
      )}

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
              deleteCategory({ variables: { id: category.id } });
            }}
          >
            <FaTrash />
          </Ui.DeleteContainer>
        </Ui.CategoriesGrid>
      ))}
      <Modal showModal={showModal} toggleModal={toggleModal}>
        <CategoryDetails category={selectedCategory} />
      </Modal>
    </Ui.BasicLayout>
  );
};
