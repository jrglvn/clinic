import React, { useState } from "react";
import * as Ui from "../../common/styles";
import { useQuery, useMutation } from "@apollo/client";
import { QUERYUSERS, DELETEUSER } from "./gql";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import { useModal, Modal } from "../../../sdk";
import { User } from "../common/types";
import { UserDetails } from "./UserDetails";
import { QUERYCATEGORIES } from "../common/gql";

export const Users = (props) => {
  const { data, error: queryError, loading } = useQuery(QUERYUSERS);
  const {
    data: dataCategories,
    error: errorCategories,
    loading: loadingCategories,
  } = useQuery(QUERYCATEGORIES);
  const { showModal, closeModal } = useModal();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [hoverItem, setHoverItem] = useState<number | null>(null);
  const [deleteUser, { error: mutationError }] = useMutation(DELETEUSER, {
    refetchQueries: [{ query: QUERYUSERS }],
    awaitRefetchQueries: true,
  });

  if (mutationError || queryError) return <div>apollo error</div>;

  return (
    <>
      {loading && <div>loading users...</div>}
      {!loading && (
        <Ui.NewItem
          onClick={() => {
            setSelectedUser(undefined);
            closeModal();
          }}
        >
          <FaUserPlus />
        </Ui.NewItem>
      )}
      {data?.users?.getUsers.map((user) => (
        <Ui.UsersGrid
          key={user.id}
          onClick={() => {
            setSelectedUser(user);
            closeModal();
          }}
          onMouseEnter={() => setHoverItem(user.id)}
          onMouseLeave={() => setHoverItem(null)}
        >
          <div>{`${user.first_name} ${user.last_name}`}</div>
          <div>{user.email}</div>
          <div>{user.phone_number || "tel. broj"}</div>
          <div>{user.role}</div>
          <Ui.DeleteContainer
            showDeleteIcon={hoverItem === user.id}
            onClick={(e) => {
              e.stopPropagation();
              deleteUser({ variables: { id: user.id } });
            }}
          >
            <FaUserMinus />
          </Ui.DeleteContainer>
        </Ui.UsersGrid>
      ))}
      <Modal showModal={showModal} closeModal={closeModal}>
        <UserDetails
          user={selectedUser}
          categories={dataCategories?.categories}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};
