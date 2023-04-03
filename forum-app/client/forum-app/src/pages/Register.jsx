import { Form, Formik } from "formik";
import { blueWhite, primaryColor, shadow } from "../assets/colors-shadows";
import { registerFormInitialValues, registerValidationSchema } from "../components/const/formikValidations";

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

const Login = () => {
  const [error, setError] = useState(false);
  const {mutateAsync: registerUser} = useRegisterUser()
  const navigate = useNavigate();
  const handleSubmit = async (user) => {
    delete user.confirm_password;
    try { 
      await registerUser(user);
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
        initialValues={registerFormInitialValues}
        onSubmit={handleSubmit}
        validationSchema={registerValidationSchema}>
          <StyledForm>
          <Title>
            Register <IoIosCreate />
          </Title>
            {error && <StyledError>Email is already used</StyledError>}
            <InputWrapper>
          <FormikInput name="name" type="text" placeholder="Your name" />
          <FormikInput name="last_name" type="text" placeholder="Your last name" />
          <FormikInput name="email" type="email" placeholder="Enter email" />
          <FormikInput name="password" type="password" placeholder="Enter password" />
              <FormikInput name="confirm_password" type="password" placeholder="Repeat Password" />
              </InputWrapper>
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
  height: 500px;
  padding: 30px 20px;
  border: 2px solid ${primaryColor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${blueWhite};
  box-shadow: ${shadow};
`;

const StyledForm = styled(Form)`
  max-width: 200px;
  height: 100%;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`
const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 3px;
`;
const Title = styled.p`
  font-size: 24px;
  margin: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-left: 10px;
    font-size: 2.2rem;
    color: ${primaryColor};
  }
`;

const StyledError = styled.p`
  font-size: 16px;
  color: red;
  text-align: center;
  margin-bottom: 8px;
`;