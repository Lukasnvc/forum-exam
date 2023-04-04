import {BackgroundWrapper, BtnWrapper, StyledError, StyledForm, StyledIcon, Title, Wrapper} from "./styles"
import { HOME_PATH, REGISTER_PATH } from "../../routes/consts";
import { loginFormInitialValues, loginValidationSchema } from "../../const/formikValidations";
import { useContext, useState } from "react";

import Button from "../../components/button/Button";
import { Formik } from "formik";
import FormikInput from "../../components/formikInput/FormikInput";
import { SlLogin } from "react-icons/sl";
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-hot-toast";
import { useLoginUser } from "../../hooks/useUsers";
import { useNavigate } from "react-router-dom";

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
      navigate(HOME_PATH)
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
            <StyledIcon/>
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

