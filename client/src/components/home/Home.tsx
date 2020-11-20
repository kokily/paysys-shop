import React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import shadow from '../../styles/shadow';

interface MenuType {
  id: number;
  divide: string;
}

interface ItemColor {
  soldier?: boolean;
  reserve?: boolean;
  general?: boolean;
}

interface MenuProps extends ItemColor {
  divide: string;
  onMenu: (e: React.MouseEvent) => void;
}

interface HomeProps {
  menu: MenuType[];
  native: string;
  onMenu: (divide: string) => void;
}

const Menu: React.FC<MenuProps> = ({ divide, onMenu, soldier, reserve, general }) => (
  <MenuItem
    onClick={onMenu}
    soldier={soldier && true}
    reserve={reserve && true}
    general={general && true}
  >
    {divide}
  </MenuItem>
);

const Home: React.FC<HomeProps> = ({ menu, native, onMenu }) => {
  return (
    <HomeBox>
      <MenuPane>
        {native === 'soldier' &&
          menu.map((item) => (
            <Menu key={item.id} divide={item.divide} onMenu={() => onMenu(item.divide)} soldier />
          ))}
        {native === 'reserve' &&
          menu.map((item) => (
            <Menu key={item.id} divide={item.divide} onMenu={() => onMenu(item.divide)} reserve />
          ))}
        {native === 'general' &&
          menu.map((item) => (
            <Menu key={item.id} divide={item.divide} onMenu={() => onMenu(item.divide)} general />
          ))}
      </MenuPane>
    </HomeBox>
  );
};

export default Home;

// Styles
const HomeBox = styled.div`
  margin-top: 1rem;
  margin-bottom: 6rem;
`;

const MenuPane = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  margin-bottom: 1rem;
`;

const MenuItem = styled.div<ItemColor>`
  ${(props) =>
    props.soldier &&
    css`
      background: ${oc.cyan[7]};
    `}

  ${(props) =>
    props.reserve &&
    css`
      background: ${oc.lime[7]};
    `}

  ${(props) =>
    props.general &&
    css`
      background: ${oc.orange[6]};
    `}

  color: white;
  ${shadow(1)};
  font-size: 1.215rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 55px;
  cursor: pointer;
  -webkit-filter: brightness(0.9);
  filter: brightness(0.9);

  &:hover {
    -webkit-filter: brightness(1);
    filter: brightness(1);
  }

  &:active {
    transform: translateY(3px);
  }
`;
