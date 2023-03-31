import * as Yup from "yup";

import { Form, Formik } from "formik";
import { bgColor, primaryColor, shadow } from "../assets/colors-shadows";
import { useContext, useState } from "react";

import Background from '../assets/background.png';
import Button from "../components/Button";
import FormikInput from "../components/FormikInput";
import { REGISTER_PATH } from "../routes/consts";
import { SlLogin } from "react-icons/sl";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useLoginUser } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";

const loginFormInitialValues = {
  email: "",
  password: "",
};

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email should contain @").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const {mutateAsync: loginUser} = useLoginUser()
  const { handleLogIn } = useContext(UserContext);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (user) => {
    try {
      const response = await loginUser(user); 
      const [obj] = response;
      handleLogIn(obj);
      toast.success("Logged in");
    } catch (err) {
      setError(true)
      toast.error("No such user");
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
            Login
            <SlLogin />
          </Title>
          {error && <StyledError>Wrong password or no such user</StyledError>}
          <FormikInput name="email" type="email" placeholder="Enter email" />
          <FormikInput name="password" type="password" placeholder="Enter password" />
          <BtnWrapper>
            <Button isBlue type="submit">
              Login
            </Button>
            <Button onClick={() => navigate(REGISTER_PATH)}>Register</Button>
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
  height: 350px;
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