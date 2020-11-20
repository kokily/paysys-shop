import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import shadow from '../../styles/shadow';
import { MenuType } from 'libs/types';

interface ListMenuProps {
  menu: MenuType[];
  onBack: () => void;
  onMenu: (id: string) => void;
}

const ListMenu: React.FC<ListMenuProps> = ({ menu, onBack, onMenu }) => {
  return (
    <ListMenuBox>
      {menu && (
        <>
          <div className="title">
            <h2>{menu[0] && menu[0].divide}</h2>
            <Button onClick={onBack}>뒤 로</Button>
          </div>

          <MenuPane>
            {menu.map((item) => (
              <MenuItem key={item.id} className={`${item.native}`} onClick={() => onMenu(item.id)}>
                {item.name} | {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} |{' '}
                {item.native}
              </MenuItem>
            ))}
          </MenuPane>
        </>
      )}
    </ListMenuBox>
  );
};

export default ListMenu;

// Styles
const ListMenuBox = styled.div`
  margin-bottom: 6rem;

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const MenuPane = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

const MenuItem = styled.div`
  color: white;
  ${shadow(1)};
  font-size: 1.215rem;
  font-weight: 700;
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;

  &.현역 {
    background: ${oc.cyan[6]};
  }

  &.예비역 {
    background: ${oc.lime[5]};
  }

  &.일반 {
    background: ${oc.orange[4]};
  }

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

const Button = styled.button`
  background: white;
  width: 120px;
  padding: 0.4rem 0.25rem;
  color: ${oc.indigo[8]};
  border: 2px solid ${oc.indigo[8]};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  transition: 0.3s;

  &:hover {
    color: white;
    border: 2px outset white;
    background: ${oc.indigo[8]};
  }

  &:active {
    transform: translateY(3px);
  }
`;
