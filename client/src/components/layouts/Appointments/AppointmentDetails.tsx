import React, { useState, useEffect, useMemo } from "react";
import { Formik, Field, Form } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERYALL,
  CREATEAPPOINTMENT,
  QUERYAPPOINTMENTS,
  UPDATEAPPOINTMENT,
} from "./gql";
import * as Ui from "../../common/styles";
import { MyDatePickerField, MySelect, parseServerDate } from "../../../sdk";
import * as yup from "yup";
import { AppointmentInput, Appointment } from "../common/types";

const appointmentSchema = yup.object().shape({
  scheduled_for: yup.date().required("obavezno polje"),
});

export const AppointmentDetails: React.FC<{
  appointment: Appointment;
  closeModal: () => any;
}> = ({ appointment, closeModal }) => {
  const { data, error, loading } = useQuery(QUERYALL);
  const [updateAppointment, { loading: updateLoading }] = useMutation<
    Appointment,
    { id: String; input: AppointmentInput }
  >(UPDATEAPPOINTMENT);
  const [createAppointment, { loading: createLoading }] = useMutation<
    Appointment,
    { input: AppointmentInput }
  >(CREATEAPPOINTMENT, {
    refetchQueries: [{ query: QUERYAPPOINTMENTS }],
    awaitRefetchQueries: true,
  });

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
          users_id: appointment?.user?.id,
          clients_id: appointment?.client?.id,
          categories_id: appointment?.category?.id,
          scheduled_for: appointment?.scheduled_for
            ? new Date(parseInt(appointment?.scheduled_for))
            : new Date(),
          created_at: appointment?.created_at
            ? new Date(parseInt(appointment?.created_at))
            : new Date(),
        }}
        onSubmit={async (values) => {
          setTemp(values);
          if (appointment) {
            const { created_at, ...rest } = values;
            updateAppointment({
              variables: {
                id: appointment?.id,
                input: {
                  ...rest,
                  scheduled_for: values.scheduled_for.toISOString(),
                } as AppointmentInput,
              },
            });
          } else {
            createAppointment({
              variables: {
                input: {
                  ...values,
                  created_at: new Date().toISOString(),
                  scheduled_for: values.scheduled_for.toISOString(),
                } as AppointmentInput,
              },
            });
          }
        }}
      >
        <Ui.Form>
          <MyDatePickerField name="scheduled_for" label="vrijeme termina" />

          <MySelect
            options={clientsData}
            name="clients_id"
            label="pacijent"
            autoFocus
          />
          <MySelect
            options={usersData}
            name="users_id"
            label="doktor"
            onChange={(val) => setUserId(val)}
          />
          <MySelect
            options={userCategoriesData}
            name="categories_id"
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
      <pre>
        {JSON.stringify(
          {
            ...temp,
            created_at_iso: new Date().toISOString(),
          },
          null,
          2
        )}
      </pre>
    </Ui.FlexColumn>
  );
};
