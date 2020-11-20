import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { MdArrowDropDown } from 'react-icons/md';

interface MenuProps {
  onClick?: (e: React.MouseEvent) => void;
}

const Menu: React.FC<MenuProps> = ({ onClick }) => (
  <MenuBox onClick={onClick}>
    <img src="/user.png" alt="Menu" />
    <MdArrowDropDown />
  </MenuBox>
);

export default Menu;

// Styles;
const MenuBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    transition: 0.125s all ease-in;
  }

  svg {
    font-size: 1.5rem;
    margin-left: 0.25rem;
    color: ${oc.gray[6]};
    transition: 0.125s all ease-in;
    margin-right: -0.4375rem;
  }

  &:hover {
    img {
      box-shadow: 0px 0 12px rgba(0, 0, 0, 0.1);
    }

    svg {
      color: ${oc.gray[9]};
    }
  }
`;
