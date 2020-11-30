import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { useTransition, animated } from 'react-spring';
import OutsideClickHandler from 'react-outside-click-handler';
import { UserType } from 'libs/types';
import shadow from 'styles/shadow';
import DropItem from './DropItem';

interface DropListProps {
  user: UserType;
  onClose: (e: MouseEvent) => void;
  onLogout: () => void;
  visible: boolean;
}

const DropList: React.FC<DropListProps> = ({ user, onClose, onLogout, visible }) => {
  const transition = useTransition(visible, null, {
    from: {
      opacity: 0,
      transform: 'scale(0.5)',
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.5)',
    },
    config: {
      tension: 400,
      friction: 26,
    },
  });

  return (
    <>
      {transition.map(({ item, key, props }) =>
        item ? (
          <OutsideClickHandler key={key} onOutsideClick={onClose}>
            <ListBox onClick={onClose} style={props}>
              <div className="menu-wrapper">
                <DropItem to={'/password'}>비밀번호 변경</DropItem>
                {user.admin && (
                  <>
                    <Split />

                    <DropItem to={'/weddings'}>웨딩빌지</DropItem>
                    <DropItem to={'/items'}>품목리스트</DropItem>

                    <Split />

                    <DropItem to={'/users'}>사용자 목록</DropItem>
                  </>
                )}

                <Split />

                <DropItem onClick={onLogout}>로그아웃</DropItem>
              </div>
            </ListBox>
          </OutsideClickHandler>
        ) : null
      )}
    </>
  );
};

export default DropList;

// Styles
const ListBox = styled(animated.div)`
  position: absolute;
  top: 100%;
  margin-top: 0.22rem;
  right: 0;
  ${shadow(5)};

  > .menu-wrapper {
    position: relative;
    z-index: 5;
    width: 12rem;
    background: white;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Split = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  height: 2px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`;
