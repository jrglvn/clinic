import React, { useEffect, useState } from "react";
import * as Ui from "../../common/styles";
import { useQuery, gql } from "@apollo/client";
import { QUERYCLIENTS } from "./gql";
import { Modal, useModal } from "../../../sdk";
import { ClientDetails } from "./ClientDetails";
import { Client } from "../common/types";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";

export const Clients = (props) => {
  const { data, error, loading } = useQuery(QUERYCLIENTS);
  const { showModal, toggleModal } = useModal();
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();

  return (
    <Ui.ClientsContainer>
      {loading && <div>loading users...</div>}
      <Ui.NewClient
        onClick={() => {
          setSelectedClient(undefined);
          toggleModal();
        }}
      >
        <FaUserPlus />
      </Ui.NewClient>
      {data?.clients?.map((client) => (
        <Ui.ClientsGrid
          key={client.id}
          onClick={() => {
            setSelectedClient(client);
            toggleModal();
          }}
        >
          <div>{`${client.first_name} ${client.last_name}`}</div>
          <div>{client.email}</div>
          <div>{client.address}</div>
          <div>{client.phone_number}</div>
          <Ui.RemoveUser></Ui.RemoveUser>
        </Ui.ClientsGrid>
      ))}
      <Modal showModal={showModal} toggleModal={toggleModal}>
        <ClientDetails client={selectedClient} />
      </Modal>
    </Ui.ClientsContainer>
  );
};
