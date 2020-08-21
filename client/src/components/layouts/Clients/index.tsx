import React, { useEffect, useState } from "react";
import * as Ui from "../../common/styles";
import { useQuery, useMutation } from "@apollo/client";
import { QUERYCLIENTS, DELETECLIENT } from "./gql";
import { Modal, useModal } from "../../../sdk";
import { ClientDetails } from "./ClientDetails";
import { Client } from "../common/types";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";

export const Clients = (props) => {
  const { data, error: queryError, loading } = useQuery(QUERYCLIENTS);
  const { showModal, closeModal } = useModal();
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const [hoverItem, setHoverItem] = useState<number | null>(null);
  const [deleteClient, { error: mutationError }] = useMutation(DELETECLIENT, {
    refetchQueries: [{ query: QUERYCLIENTS }],
    awaitRefetchQueries: true,
  });

  if (mutationError || queryError) return <div>apollo error</div>;

  return (
    <>
      {loading && <div>loading clients...</div>}
      {!loading && (
        <Ui.NewItem
          onClick={() => {
            setSelectedClient(undefined);
            closeModal();
          }}
        >
          <FaUserPlus />
        </Ui.NewItem>
      )}
      {data?.clients?.map((client) => (
        <Ui.ClientsGrid
          key={client.id}
          onClick={() => {
            setSelectedClient(client);
            closeModal();
          }}
          onMouseEnter={() => setHoverItem(client.id)}
          onMouseLeave={() => setHoverItem(null)}
        >
          <div>{`${client.first_name} ${client.last_name}`}</div>
          <div>{client.email}</div>
          <div>{client.address}</div>
          <div>{client.phone_number}</div>
          <Ui.DeleteContainer
            showDeleteIcon={hoverItem === client.id}
            onClick={(e) => {
              e.stopPropagation();
              deleteClient({ variables: { id: client.id } });
            }}
          >
            <FaUserMinus />
          </Ui.DeleteContainer>
        </Ui.ClientsGrid>
      ))}
      <Modal showModal={showModal} closeModal={closeModal}>
        <ClientDetails client={selectedClient} closeModal={closeModal} />
      </Modal>
    </>
  );
};
