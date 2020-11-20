import React, { useCallback, useRef, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';
import { UserType } from 'libs/types';
import { media } from 'styles/media';
import shadow from 'styles/shadow';
import useToggle from 'hooks/useToggle';
import Menu from './Menu';
import DropList from './DropList';

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [menu, toggleMenu] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);

  const onOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as any)) return;

      toggleMenu();
    },
    [toggleMenu]
  );

  return (
    <HeaderContainer>
      <Layout>
        <Content>
          <Logo to="/soldier">행사전표시스템</Logo>

          <Spacer />

          <>
            <div ref={ref}>
              <Menu onClick={toggleMenu} />
            </div>
            <DropList user={user} onClose={onOutsideClick} onLogout={onLogout} visible={menu} />
          </>
        </Content>
      </Layout>
    </HeaderContainer>
  );
};

export default Header;

// Styles
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  top: 0px;
  ${shadow(1)};
  z-index: 20;
`;

const Layout = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  height: auto;
`;

const Content = styled.div`
  width: 1200px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;

  ${media.large} {
    width: 992px;
  }

  ${media.medium} {
    width: 100%;
  }
`;

const Logo = styled(Link)`
  font-size: 1.4rem;
  letter-spacing: 2px;
  color: ${oc.teal[7]};
  font-family: 'Rajdhani';
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-shadow: 0.5px 0.5px;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;
