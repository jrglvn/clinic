import React, { useState, useEffect, useMemo } from "react";
import { Formik, Field, Form } from "formik";
import { useQuery } from "@apollo/client";
import { QUERYALL } from "./gql";
import * as Ui from "../../common/styles";
<<<<<<< HEAD
import { DatePickerField, SelectField } from "../../../sdk";
=======
import { DatePickerField, MyInputField } from "../../../sdk";
>>>>>>> 87de8b75daeed43688ae720016e31da00744a7d8

import * as yup from "yup";

const appointmentSchema = yup.object().shape({
  schedule_date: yup.date().required("obavezno polje"),
});

export const AppointmentDetails = ({ appointment }) => {
  const { data, error, loading } = useQuery(QUERYALL);
  const [userId, setUserId] = useState<number>();

  const [values, setValues] = useState({});

  const userCategories: number[] = useMemo(() => {
    const user = data?.users?.getUsers.find((user) => user.id === userId);
    return user?.assigned_categories?.map((category) => category.id);
  }, [userId]);

  useEffect(() => {
    setUserId(data?.users?.getUsers[0].id);
  }, [data]);

  const usersData = data?.users?.getUsers?.map((user) => {
    return { value: user.id, label: `${user.first_name} ${user.last_name}` };
  });

  return (
    <Ui.AppointmentDetails>
      <Formik
        validationSchema={appointmentSchema}
        initialValues={{
          users: appointment?.user.id,
          clients: appointment?.client.id,
          categories: appointment?.category.id,
        }}
        onSubmit={(val) => {
          setValues(val);
        }}
      >
        <Ui.Form>
          <label htmlFor="schedule_date">vrijeme termina</label>
          <Field name="schedule_date" as={DatePickerField} />

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

          <SelectField data={usersData} name="test2"></SelectField>

          <button type="submit">Sačuvaj</button>
        </Ui.Form>
      </Formik>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </Ui.AppointmentDetails>
  );
};
