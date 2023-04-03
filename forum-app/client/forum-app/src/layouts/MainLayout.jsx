import styled from "styled-components";

const MainLayout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default MainLayout;

const Wrapper = styled.div`
  margin-top: 50px;
`;