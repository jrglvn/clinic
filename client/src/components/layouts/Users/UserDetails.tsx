import React, { useState } from "react";
import { Formik } from "formik";
import * as Ui from "../../common/styles";
import { MyInputField, MySelectField } from "../../../sdk";
import { User } from "../common/types";
import { useMutation } from "@apollo/client";
import { UPDATEUSER, CREATEUSER, QUERYUSERS } from "./gql";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("ime je obvezno polje"),
  last_name: yup.string().required("prezime je obvezno polje"),
  email: yup.string().email("email adresa nije ispravna").nullable(),
  address: yup.string().nullable(),
  phone_number: yup.string().nullable(),
});

export const UserDetails = (props: { user?: User }) => {
  const [temp, setTemp] = useState({});
  const [updateUser, { loading: updateLoading }] = useMutation(UPDATEUSER);
  const [createUser, { loading: createLoading }] = useMutation(CREATEUSER, {
    refetchQueries: [{ query: QUERYUSERS }],
    awaitRefetchQueries: true,
  });

  const { user } = props;
  return (
    <Ui.FlexColumn>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          first_name: user?.first_name,
          last_name: user?.last_name,
          email: user?.email,
          address: user?.address,
          phone_number: user?.phone_number,
          role: user?.role,
          assigned_categories: user?.assigned_categories,
        }}
        onSubmit={async (values) => {
          if (user) {
            const categories = values?.assigned_categories?.map((cat) => {
              if (cat) return parseInt(cat.id);
            });
            console.log("users: ", categories);
            await updateUser({
              variables: {
                id: user?.id,
                input: {
                  ...values,
                  assigned_categories: categories,
                },
              },
            });
          } else {
            await createUser({
              variables: { input: { ...values } },
            });
          }
          setTemp(values);
        }}
      >
        <Ui.Form>
          <MyInputField name="first_name" label="ime" />
          <MyInputField name="last_name" label="prezime" />
          <MyInputField name="email" label="e-mail" />
          <MyInputField name="address" label="adresa" />
          <MyInputField name="phone_number" label="telefonski broj" />
          {!user && (
            <MyInputField name="password" label="lozinka" type="password" />
          )}
          {!user && (
            <MyInputField
              name="password-repeat"
              label="ponovite lozinku"
              type="password"
            />
          )}
          <MySelectField
            name="role"
            label="razina ovlaštenja"
            options={[
              { value: "ADMIN", label: "administrator" },
              { value: "USER", label: "korisnik" },
            ]}
          />

          <button type="submit" disabled={createLoading || updateLoading}>
            {createLoading || updateLoading ? "Izmjene se spremaju" : "Sačuvaj"}
          </button>
        </Ui.Form>
      </Formik>
      <pre>{JSON.stringify({ id: user?.id, ...temp }, null, 2)}</pre>
    </Ui.FlexColumn>
  );
};
