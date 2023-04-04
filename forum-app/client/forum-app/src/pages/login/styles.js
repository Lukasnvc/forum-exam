import { blueWhite, primaryColor, shadow } from "../../assets/colors-shadows";

import Background from "../../assets/background.png";
import { FaUserCircle } from "react-icons/fa";
import { Form } from "formik";
import styled from "styled-components";

export const BackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${Background});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: fit-content;
  height: 350px;
  padding: 20px;
  border: 2px solid ${primaryColor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${blueWhite};
  box-shadow: ${shadow};
`;

export const StyledForm = styled(Form)`
  max-width: 200px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const StyledIcon = styled(FaUserCircle)`
  font-size: 4rem;
  color: ${primaryColor};
`;

export const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 3px;
`;
export const Title = styled.p`
  font-size: 24px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-left: 10px;
  }
`;

export const StyledError = styled.p`
  font-size: 16px;
  color: red;
  text-align: center;
  margin-bottom: 8px;
`;
