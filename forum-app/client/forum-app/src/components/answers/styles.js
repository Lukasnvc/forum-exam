import {
  cardsBg,
  hoverColor,
  inputBgColor,
  primaryColor,
  secondaryColor,
  shadow,
} from "../../assets/colors-shadows";

import Button from "../button/Button";
import { FaArrowUp } from "react-icons/fa";
import { Form } from "formik";
import { GoCommentDiscussion } from "react-icons/go";
import { RiDeleteBin2Line } from "react-icons/ri";
import styled from "styled-components";

export const Comment = styled.div`
  width: 100%;
  background-color: ${cardsBg};
  box-shadow: ${shadow};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const CommentTop = styled.div`
  margin: 0;
  background-color: ${inputBgColor};
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    gap: 10px;
  }
  span {
    font-size: 0.7rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const CommentBottom = styled.div`
  padding: 0 20px;

  p {
    text-indent: 10px;
    text-transform: capitalize;
    overflow: scroll;
    max-height: 150px;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid ${secondaryColor};
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: ${shadow};
`;

export const StyledMin = styled(FaArrowUp)`
  position: absolute;
  color: ${primaryColor};
  font-size: 2.2rem;
  top: 30px;
  right: -45px;
  cursor: pointer;
  &:hover {
    color: ${hoverColor};
  }
`;

export const StyledShow = styled(GoCommentDiscussion)`
  color: ${primaryColor};
  font-size: 1.4rem;
  cursor: pointer;
  &:hover {
    color: ${hoverColor};
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
  transition: 300ms;
  &:hover {
    color: ${hoverColor};
  }
`;

export const StyledButtom = styled(Button)`
  font-size: 1rem;
  padding: 5px 10px;
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
