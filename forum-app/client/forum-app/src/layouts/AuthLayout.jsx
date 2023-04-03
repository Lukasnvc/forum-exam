import styled from "styled-components";

const AuthLayout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default AuthLayout;

const Wrapper = styled.div`
  margin-top: 50px;
`;