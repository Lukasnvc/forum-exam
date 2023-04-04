import { cardsBg, inputBgColor, primaryColor, shadow } from "../../assets/colors-shadows";

import { Form } from "formik";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: fit-content;
  background-color: ${cardsBg};
  height: 70vh;
  width: 80vw;
  margin: 0 auto;
  padding: 40px;
  border: 2px solid ${primaryColor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  box-shadow: ${shadow};
  margin-top: 100px;
`;

export const SideWrapper = styled.div`
  max-width: 300px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      text-align: center;
      font-weight: 600;
      text-transform: capitalize;
    }
  }
  p {
    text-align: center;
    text-indent: 15px;
    line-height: 1.6;
    font-size: 1.2rem;
    font-style: italic;
  }
`;

export const StyledForm = styled(Form)`
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 16px;
`;

export const Title = styled.p`
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

export const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border-radius: 4px;
  color: black;
  background-color: ${inputBgColor};
  padding: 10px 14px;
  border: none;
  outline: none;
`;

export const StyledIcon = styled.span`
  font-size: 5rem;
  color: ${primaryColor};
  margin-top: 30px;
`;
