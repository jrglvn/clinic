import React, { useState } from "react";
import { Formik } from "formik";
import * as Ui from "../../common/styles";
import { MyInputField } from "../../../sdk";
import { Category } from "../common/types";
import { useMutation } from "@apollo/client";
import { QUERYCATEGORIES, CREATECATEGORY, UPDATECATEGORY } from "./gql";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("naziv je obvezno polje"),
});

export const CategoryDetails = (props: {
  category?: Category;
  closeModal: any;
}) => {
  const [temp, setTemp] = useState({});
  const [updateCategory, { loading: updateLoading }] = useMutation(
    UPDATECATEGORY
  );
  const [createCategory, { loading: createLoading }] = useMutation(
    CREATECATEGORY,
    {
      refetchQueries: [{ query: QUERYCATEGORIES }],
      awaitRefetchQueries: true,
    }
  );

  const { category } = props;
  return (
    <Ui.FlexColumn>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: category?.name,
        }}
        onSubmit={async (values) => {
          if (category) {
            await updateCategory({
              variables: { id: category?.id, input: { ...values } },
            });
          } else {
            await createCategory({
              variables: { input: { ...values } },
            });
          }
          setTemp(values);
          // props.closeModal();
        }}
      >
        <Ui.Form>
          <MyInputField name="name" label="naziv kategorije" autoFocus />

          <button type="submit" disabled={createLoading || updateLoading}>
            {createLoading || updateLoading ? "Izmjene se spremaju" : "Sačuvaj"}
          </button>
        </Ui.Form>
      </Formik>
      <pre>{JSON.stringify({ id: category?.id, ...temp }, null, 2)}</pre>
    </Ui.FlexColumn>
  );
};
