import { ADD_PATH, EDIT_PATH, HOME_PATH, LOGIN_PATH, REGISTER_PATH } from '../routes/consts';
import { blueWhite, hoverColor, primaryColor, shadow } from '../assets/colors-shadows'

import { MdOutlineForum } from 'react-icons/md';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isLoggedIn, handleLogOut } = useContext(UserContext)
  const navigate = useNavigate()
  return (
    <Wrapper>
      <StyledLink href='' target='blank'>
        <MdOutlineForum/>
      </StyledLink>
      <BtnContainer>
        {isLoggedIn ? (
          <>
          <NavItem onClick={() => navigate(HOME_PATH)}><span>HOME</span></NavItem>
          <NavItem onClick={() => navigate(ADD_PATH)}><span>ADD QUESTIONS</span></NavItem>
          <NavItem onClick={() => navigate(EDIT_PATH)} ><span>MY QUESTIONS</span></NavItem>
            <NavItem onClick={handleLogOut}><span>LOGOUT</span></NavItem>
            </>
        ) : (
            <>
          <NavItem onClick={() => navigate(HOME_PATH)}><span>HOME</span></NavItem> 
          <NavItem onClick={() => navigate(LOGIN_PATH)}><span>LOGIN</span></NavItem>
          <NavItem onClick={() => navigate(REGISTER_PATH)}><span>REGISTER</span></NavItem>
          </>
        )}
      </BtnContainer>

    </Wrapper>
  )
}

export default Navbar

const Wrapper = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${primaryColor};
  width: 100%;
  box-shadow: ${shadow};
`;

const BtnContainer = styled.div`
  margin-right: 20px;
  display: flex;
`;
const NavItem = styled.div`
  padding: 20px;
  margin: 0;
  cursor: pointer;
  transition: 300ms;
  span {
    font-weight: 600;
    color: ${blueWhite};
    transition: 300ms;
  }
  &:hover {
    span {
    color: ${hoverColor};
  }
  }
`;

const StyledLink = styled.a`
  margin: 3px;
  color: black;
  cursor: pointer;
  svg {
    font-size: 1.4rem;
    margin: 0 20px;
    cursor: pointer;
    padding: 0;
    transition: 300ms;
    &:hover {
      color: ${hoverColor};
    }
  }
`;