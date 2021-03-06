import React, { useState } from "react";
import { Formik } from "formik";
import * as Ui from "../../common/styles";
import { MyInputField } from "../../../sdk";
import { Client } from "../common/types";
import { useMutation } from "@apollo/client";
import { UPDATECLIENT, CREATECLIENT, QUERYCLIENTS } from "./gql";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("ime je obvezno polje"),
  last_name: yup.string().required("prezime je obvezno polje"),
  email: yup.string().email("email adresa nije ispravna").nullable(),
  address: yup.string().nullable(),
  phone_number: yup.string().nullable(),
});

export const ClientDetails = (props: { client?: Client; closeModal: any }) => {
  const [temp, setTemp] = useState({});
  const [updateClient, { loading: updateLoading }] = useMutation(UPDATECLIENT);
  const [createClient, { loading: createLoading }] = useMutation(CREATECLIENT, {
    refetchQueries: [{ query: QUERYCLIENTS }],
    awaitRefetchQueries: true,
  });

  const { client } = props;
  return (
    <Ui.FlexColumn>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          first_name: client?.first_name,
          last_name: client?.last_name,
          email: client?.email,
          address: client?.address,
          phone_number: client?.phone_number,
        }}
        onSubmit={async (values) => {
          if (client) {
            await updateClient({
              variables: { id: client?.id, input: { ...values } },
            });
          } else {
            await createClient({
              variables: { input: { ...values } },
            });
          }
          setTemp(values);
          // props.closeModal();
        }}
      >
        <Ui.Form>
          <MyInputField name="first_name" label="ime" autoFocus />
          <MyInputField name="last_name" label="prezime" />
          <MyInputField name="address" label="adresa" />
          <MyInputField name="email" label="e-mail" />
          <MyInputField name="phone_number" label="telefonski broj" />

          <button type="submit" disabled={createLoading || updateLoading}>
            {createLoading || updateLoading ? "Izmjene se spremaju" : "Sačuvaj"}
          </button>
        </Ui.Form>
      </Formik>
      <pre>{JSON.stringify({ id: client?.id, ...temp }, null, 2)}</pre>
    </Ui.FlexColumn>
  );
};
