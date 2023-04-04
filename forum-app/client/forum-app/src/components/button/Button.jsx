import { hoverColor, shadow } from "../../assets/colors-shadows";

import styled from "styled-components";

const Button = ({ children, isBlue, ...rest }) => {
  return (
    <StyledBtn isBlue={isBlue}  {...rest}>
      {children}
    </StyledBtn>
  );
};

export default Button;

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: white;
  background-color: ${(props) => (props.isBlue ? "#346ef4" : "#ccc")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 300ms;
  &:hover {
    color: ${hoverColor};
    box-shadow: ${shadow};
  }
`;