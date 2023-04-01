import { ErrorMessage, Field } from "formik";

import { inputBgColor } from "../assets/colors-shadows";
import styled from "styled-components";

const FormikInput = ({ name, placeholder, type = "text" }) => {
  return (
    <div>
      <Field name={name}>
        {({ field, form }) => (
          <StyledInput {...field} placeholder={placeholder} type={type} />
        )}
      </Field>
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

const StyledInput = styled.input`
  width: 100%;
  font-size: 16px;
  border-radius: 4px;
  color: black;
  background-color: ${inputBgColor};
  padding: 10px 14px;
  border: none;
  outline: none;
  ${({ error }) =>
    error &&
    `
    border: 2px solid red;
  `}
`;


export default FormikInput;