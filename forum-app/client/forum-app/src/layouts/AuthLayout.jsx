import styled from "styled-components";

const AuthLayout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default AuthLayout;

const Wrapper = styled.div`
  padding-top: 100px;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;