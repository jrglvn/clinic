import React, { useState } from "react";
import { Formik } from "formik";
import * as Ui from "../../common/styles";
import { MyInputField } from "../../../sdk";
import { Client } from "../common/types";
import { useMutation } from "@apollo/client";
import { UPDATECLIENT } from "./gql";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("ime je obvezno polje"),
  last_name: yup.string().required("prezime je obvezno polje"),
  email: yup.string().email("upisano nije ispravna email adresa").nullable(),
  address: yup.string().nullable(),
  phone_number: yup.string().nullable(),
});

export const ClientDetails = (props: { client?: Client }) => {
  const [temp, setTemp] = useState({});
  const [updateClient, { loading }] = useMutation(UPDATECLIENT);

  const { client } = props;
  return (
    <Ui.AppointmentDetails>
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
          await updateClient({
            variables: { id: client?.id, input: { ...values } },
          });
          setTemp(values);
        }}
      >
        <Ui.Form>
          <MyInputField name="first_name" label="ime" />
          <MyInputField name="last_name" label="prezime" />
          <MyInputField name="address" label="adresa" />
          <MyInputField name="email" label="e-mail" />
          <MyInputField name="phone_number" label="telefonski broj" />

          <button type="submit" disabled={loading}>
            {loading ? "Izmjene se spremaju" : "Sačuvaj"}
          </button>
        </Ui.Form>
      </Formik>
      <pre>{JSON.stringify({ id: client?.id, ...temp }, null, 2)}</pre>
    </Ui.AppointmentDetails>
  );
};
