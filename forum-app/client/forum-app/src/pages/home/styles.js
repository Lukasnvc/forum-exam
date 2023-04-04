import { inputBgColor, primaryColor, shadow } from "../../assets/colors-shadows";

import Button from "../../components/button/Button";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  overflow-y: scroll;
  padding-bottom: 30px;
`;

export const StyledButtom = styled(Button)`
  font-size: 1rem;
  padding: 5px 10px;
  margin-top: 30px;
  svg {
    margin-left: 5px;
  }
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  gap: 50px;
  position: relative;
`;

export const LeftSide = styled.div`
  min-width: 200px;
  div {
    box-shadow: ${shadow};
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 200px;
    height: 100vh;
    padding: 20px;
    background-color: ${inputBgColor};
    h2 {
      margin: 50px 0;
    }
    h3 {
      text-transform: capitalize;
      margin-bottom: 20px;
    }
  }
`;

export const MyQuestions = styled(Button)`
  padding: 5px 10px;
  font-size: 1rem;
`;

export const StyledIcon = styled.span`
  font-size: 4rem;
  color: ${primaryColor};
  margin-top: 30px;
`;
