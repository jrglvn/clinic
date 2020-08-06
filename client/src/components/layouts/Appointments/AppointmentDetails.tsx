import React, { useState, useEffect, useMemo } from "react";
import { Formik, Field } from "formik";
import { useQuery } from "@apollo/client";
import { QUERYALL } from "./gql";
import * as Ui from "../../common/styles";
import { DatePickerField } from "../../../sdk";

import * as yup from "yup";

const appointmentSchema = yup.object().shape({
  schedule_date: yup.date().required("obavezno polje"),
});

export const AppointmentDetails = ({ appointment }) => {
  const { data, error, loading } = useQuery(QUERYALL);
  const [userId, setUserId] = useState<number>();

  const userCategories: number[] = useMemo(() => {
    const user = data?.users?.getUsers.find((user) => user.id === userId);
    return user?.assigned_categories?.map((category) => category.id);
  }, [userId]);

  useEffect(() => {
    setUserId(data?.users?.getUsers[0].id);
  }, [data]);

  return (
    <Ui.AppointmentDetails>
      <Formik
        validationSchema={appointmentSchema}
        initialValues={{
          users: appointment?.user.id,
          clients: appointment?.client.id,
          categories: appointment?.category.id,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Ui.Form>
          <label htmlFor="schedule_date">vrijeme termina</label>
          <DatePickerField name="schedule_date" />

          <label htmlFor="users">doktor</label>
          <Field
            name="users"
            as="select"
            placeholder="izaberite dr."
            onChange={(e) => setUserId(e.target.value)}
          >
            {data?.users?.getUsers.map((user, index) => (
              <option
                key={index}
                value={user.id}
              >{`${user.first_name} ${user.last_name}`}</option>
            ))}
          </Field>

          <label htmlFor="clients">pacijent</label>
          <Field name="clients" as="select" placeholder="izaberite pacijenta">
            {data?.clients?.map((client, index) => (
              <option
                key={index}
                value={client.id}
              >{`${client.first_name} ${client.last_name}`}</option>
            ))}
          </Field>

          <label htmlFor="categories">kategorija</label>
          <Field
            name="categories"
            as="select"
            placeholder="izaberite kategoriju"
          >
            {data?.categories
              ?.filter((category) => userCategories?.includes(category.id))
              .map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Field>

          <button type="submit">Sačuvaj</button>
        </Ui.Form>
      </Formik>
    </Ui.AppointmentDetails>
  );
};
