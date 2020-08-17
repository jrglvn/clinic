import React, { useState, useEffect, useMemo } from "react";
import { Formik, Field, Form } from "formik";
import { useQuery } from "@apollo/client";
import { QUERYALL } from "./gql";
import * as Ui from "../../common/styles";
import { MyDatePickerField, MySelect, parseServerDate } from "../../../sdk";
import * as yup from "yup";

const appointmentSchema = yup.object().shape({
  scheduled_for: yup.date().required("obavezno polje"),
});

export const AppointmentDetails = ({ appointment, closeModal }) => {
  const { data, error, loading } = useQuery(QUERYALL);
  const [userId, setUserId] = useState<number>();

  const [temp, setTemp] = useState({});

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
          scheduled_for: new Date(parseInt(appointment?.scheduled_for)),
          created_at: new Date(parseInt(appointment?.created_at)),
        }}
        onSubmit={(values) => {
          setTemp(values);
          //closeModal();
        }}
      >
        <Ui.Form>
          <MyDatePickerField name="scheduled_for" label="vrijeme termina" />

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
          {appointment && (
            <MyDatePickerField
              name="created_at"
              label="vrijeme dogovora termina"
              disabled
            />
          )}

          <button type="submit">Sačuvaj</button>
        </Ui.Form>
      </Formik>
      <pre>{JSON.stringify(temp, null, 2)}</pre>
    </Ui.FlexColumn>
  );
};
