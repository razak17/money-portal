import * as React from "react";

export const useForm = (initialValues: any) => {
  const [values, setValues] = React.useState(initialValues);

  return [
    values,
    (e: any) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  ];
};
