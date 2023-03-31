import * as Yup from "yup";

import { Form, Formik } from "formik";
import { bgColor, primaryColor, shadow } from "../assets/colors-shadows";

import Background from '../assets/background.png';
import Button from "../components/Button";
import FormikInput from "../components/FormikInput";
import { IoIosCreate } from "react-icons/io";
import { LOGIN_PATH } from "../routes/consts";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../hooks/useUsers";
import { useState } from "react";

const loginFormInitialValues = {
  name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const loginValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Email should contain @").required("Required"),
  password: Yup.string().required("Required"),
  confirm_password: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});

const Login = () => {
  const [error, setError] = useState(false);
  const {mutateAsync: registerUser} = useRegisterUser()
  const navigate = useNavigate();
  const handleSubmit = async (user) => {
    delete user.confirm_password;
    try { 
      const response = await registerUser(user);
      navigate(LOGIN_PATH);
      toast.success('Succesfuly registered')
    } catch (err) {
      setError(true)
      toast.error('Something went wrong, please try again')
    }
  };
  return (
    <BackgroundWrapper>
    <Wrapper>
      <Formik
        initialValues={loginFormInitialValues}
        onSubmit={handleSubmit}
        validationSchema={loginValidationSchema}>
        <StyledForm>
          <Title>
            Register <IoIosCreate />
          </Title>
          {error && <StyledError>Email is already used</StyledError>}
          <FormikInput name="name" type="text" placeholder="Your name" />
          <FormikInput name="last_name" type="text" placeholder="Your last name" />
          <FormikInput name="email" type="email" placeholder="Enter email" />
          <FormikInput name="password" type="password" placeholder="Enter password" />
          <FormikInput name="confirm_password" type="password" placeholder="Repeat Password" />
          <BtnWrapper>
            <Button isBlue type="submit">
              Register
            </Button>
            <Button onClick={() => navigate(LOGIN_PATH)}>Login</Button>
          </BtnWrapper>
        </StyledForm>
      </Formik>
      </Wrapper>
      </BackgroundWrapper>
  );
};

export default Login;

const BackgroundWrapper = styled.div`
width: 100vw;
height: 100vh;
background-image: url(${Background});
background-position: center;
background-size: cover;
background-repeat: no-repeat;
display: flex;
align-items: center;
justify-content: center;
`

const Wrapper = styled.div`
  width: fit-content;
  height: 450px;
  padding: 20px;
  border: 2px solid ${primaryColor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${bgColor};
  box-shadow: ${shadow};
`;

const StyledForm = styled(Form)`
  max-width: 200px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.p`
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-left: 10px;
  }
`;

const StyledError = styled.p`
  font-size: 16px;
  color: red;
  text-align: center;
  margin-bottom: 8px;
`;