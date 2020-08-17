import React, { useState, useEffect, useMemo } from "react";
import { Formik, Field, Form } from "formik";
import { useQuery } from "@apollo/client";
import { QUERYALL } from "./gql";
import * as Ui from "../../common/styles";
import { MyDatePickerField, MySelect } from "../../../sdk";
import * as yup from "yup";

const appointmentSchema = yup.object().shape({
  schedule_date: yup.date().required("obavezno polje"),
});

export const AppointmentDetails = ({ appointment, closeModal }) => {
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

  const clientsData = data?.clients?.map((client) => {
    return {
      value: client.id,
      label: `${client.first_name} ${client.last_name}`,
    };
  });

  const userCategoriesData = data?.categories
    ?.filter((category) => userCategories?.includes(category.id))
    .map((category) => {
      return { value: category.id, label: category.name };
    });

  return (
    <Ui.FlexColumn>
      <Formik
        validationSchema={appointmentSchema}
        initialValues={{
          users: appointment?.user.id,
          clients: appointment?.client.id,
          categories: appointment?.category.id,
          schedule_date:
            appointment?.schedule_date || new Date().toLocaleString(),
        }}
        onSubmit={(values) => {
          setValues(values);
          closeModal();
        }}
      >
        <Ui.Form>
          <label htmlFor="schedule_date">vrijeme termina</label>
          <Field name="schedule_date" as={MyDatePickerField} />

          <MySelect
            options={clientsData}
            name="clients"
            label="pacijent"
            autoFocus
          />
          <MySelect
            options={usersData}
            name="users"
            label="doktor"
            onChange={(val) => setUserId(val)}
          />
          <MySelect
            options={userCategoriesData}
            name="categories"
            label="kategorija"
          />

          <button type="submit">Sačuvaj</button>
        </Ui.Form>
      </Formik>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </Ui.FlexColumn>
  );
};
