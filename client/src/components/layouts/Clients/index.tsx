import React, { useEffect, useState, useMemo } from "react";
import * as Ui from "../../common/styles";
import { useQuery, useMutation } from "@apollo/client";
import { QUERYCLIENTS, DELETECLIENT } from "./gql";
import { Modal, useModal, Table } from "../../../sdk";
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

  const columns = React.useMemo(
    () => [
      {
        Header: "Ime",
        accessor: "first_name",
      },
      {
        Header: "Prezime",
        accessor: "last_name",
      },
      {
        Header: "Adresa",
        accessor: "address",
      },
      {
        Header: "E-mail",
        accessor: "email",
      },
      {
        Header: "Tel.broj",
        accessor: "phone_number",
      },
    ],
    []
  );
  if (mutationError || queryError) return <div>apollo error</div>;

  const clients = data?.clients;

  return (
    <>
      {loading && <div>loading clients...</div>}
      {!loading && (
        <>
          <Ui.NewItem
            onClick={() => {
              setSelectedClient(undefined);
              closeModal();
            }}
          >
            <FaUserPlus />
          </Ui.NewItem>
          <Table columns={columns} data={clients} />
        </>
      )}

      <Modal showModal={showModal} closeModal={closeModal}>
        <ClientDetails client={selectedClient} closeModal={closeModal} />
      </Modal>
    </>
  );
};
