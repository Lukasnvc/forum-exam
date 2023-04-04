import {
  cardsBg,
  hoverColor,
  inputBgColor,
  primaryColor,
  secondaryColor,
  shadow,
} from "../../assets/colors-shadows";

import Button from "../button/Button";
import { Form } from "formik";
import { RiDeleteBin2Line } from "react-icons/ri";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Post = styled.div`
  width: 100%;
  box-shadow: ${shadow};
  border: 3px solid ${primaryColor};
  background-color: ${cardsBg};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
export const PostTop = styled.div`
  background-color: ${inputBgColor};
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  span {
    font-size: 0.7rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
    svg {
      font-size: 1rem;
    }
  }
`;
export const PostBotom = styled.div`
  padding: 20px;
  h3 {
    text-transform: uppercase;
    text-align: center;
    margin: 0 50px;
    padding-bottom: 10px;
    overflow-y: hidden;
    border-bottom: 1px solid ${primaryColor};
  }
  p {
    text-transform: capitalize;
    text-indent: 15px;
    line-height: 1.5;
    overflow-x: scroll;
    max-height: 200px;
  }
  &:hover {
    h3 {
      border-bottom: 1px solid ${secondaryColor};
      color: ${secondaryColor};
    }
  }
`;

export const StyledForm = styled(Form)`
  position: relative;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 16px;
  svg {
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${primaryColor};
    cursor: pointer;
    &:hover {
      color: ${hoverColor};
    }
  }
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border-radius: 4px;
  color: black;
  background-color: ${inputBgColor};
  overflow-x: scroll;
  padding: 15px 14px;
  border: none;
  outline: none;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: end;
  Button {
    font-size: 1rem;
    padding: 5px 15px;
  }
`;

export const Like = styled.div`
  svg {
    color: ${primaryColor};
  }
  cursor: pointer;
  &:hover {
    svg {
      color: ${hoverColor};
    }
  }
`;

export const Delete = styled(RiDeleteBin2Line)`
  color: ${primaryColor};
  cursor: pointer;
  font-size: 1.1rem;
  transition: 300ms;
  &:hover {
    color: ${hoverColor};
  }
`;

export const StyledButtom = styled(Button)`
  font-size: 1rem;
  padding: 5px 10px;
`;
