import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #3b82f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled(Link)`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  text-decoration: none;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

interface MenuLinkProps {
  $active: boolean;
}

const MenuLink = styled(Link)<MenuLinkProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: ${props => props.$active ? '#3b82f6' : '#4b5563'};
  font-weight: ${props => props.$active ? '600' : '400'};
  transition: color 0.2s;

  &:hover {
    color: #3b82f6;
  }
`;

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  return (
    <Nav>
      <Container>
        <Logo>
          <LogoIcon>
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </LogoIcon>
          <LogoText to="/">URL Shortener</LogoText>
        </Logo>
        
        <Menu>
          <MenuLink 
            to="/" 
            $active={location.pathname === '/'}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Shorten
          </MenuLink>
        </Menu>
      </Container>
    </Nav>
  );
};