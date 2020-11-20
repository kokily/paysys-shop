import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';
import shadow from 'styles/shadow';

const UserMenu = () => (
  <MenuBox>
    <MenuContent>
      <NavLink to="/soldier" className="link" activeClassName="active">
        <i className="material-icons">military_tech</i>현 역
      </NavLink>
      <NavLink to="/reserve" className="link" activeClassName="active">
        <i className="material-icons">camera_enhance</i>예비역
      </NavLink>
      <NavLink to="/general" className="link" activeClassName="active">
        <i className="material-icons">face</i>일 반
      </NavLink>
      <NavLink to="/cart" className="link" activeClassName="active">
        <i className="material-icons">shopping_cart</i>전표확인
      </NavLink>
      <NavLink to="/fronts" className="link" activeClassName="active">
        <i className="material-icons">receipt_long</i>빌지록록
      </NavLink>
    </MenuContent>
  </MenuBox>
);

export default UserMenu;

// Styles
const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuContent = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  max-width: 768px;
  height: 60px;
  ${shadow(1)};
  display: flex;
  overflow-x: auto;

  .link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    min-width: 20%;
    overflow: hidden;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.1s ease-in-out;

    &.active {
      color: ${oc.teal[6]};
    }

    &:hover {
      background: ${oc.teal[1]};
    }
  }
`;
