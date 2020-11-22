import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { media } from 'styles/media';
import shadow from 'styles/shadow';
import RemoveModal from 'components/common/RemoveModal';

interface ButtonProps {
  menu?: boolean;
  remove?: boolean;
  admin?: boolean;
  employee?: boolean;
}

interface UserButtonProps {
  onBack: () => void;
  onRemove: () => void;
  onAdmin: () => void;
  onEmployee: () => void;
}

const UserButton: React.FC<UserButtonProps> = ({ onBack, onRemove, onAdmin, onEmployee }) => {
  const [modal, setModal] = useState(false);

  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <>
      <Container>
        <Button menu onClick={onBack}>
          목록으로
        </Button>
        <Button remove onClick={onRemoveClick}>
          삭제하기
        </Button>
        <Button admin onClick={onAdmin}>
          관리자 승급
        </Button>
        <Button employee onClick={onEmployee}>
          일반 강등
        </Button>
      </Container>
      <RemoveModal visible={modal} onConfirm={onConfirm} onCancel={onCancel} />
    </>
  );
};

export default UserButton;

const Container = styled.div`
  display: contents;
  margin-top: 1rem;

  ${media.large} {
    width: 1200px;
    padding-left: 15rem;
    padding-right: 15rem;
  }
`;

const Button = styled.button<ButtonProps>`
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  transition: 0.2s all;

  ${(props) =>
    props.menu &&
    css`
      border: 1px solid ${oc.cyan[6]};
      background: white;
      color: ${oc.cyan[6]};

      &:hover {
        background: ${oc.blue[6]};
        color: white;
        ${shadow(1)};
      }
    `}

  ${(props) =>
    props.remove &&
    css`
      border: 1px solid ${oc.red[6]};
      background: white;
      color: ${oc.red[6]};

      &:hover {
        background: ${oc.red[6]};
        color: white;
        ${shadow(1)};
      }
    `}

    ${(props) =>
    props.admin &&
    css`
      border: 1px solid ${oc.indigo[6]};
      background: white;
      color: ${oc.indigo[6]};

      &:hover {
        background: ${oc.indigo[6]};
        color: white;
        ${shadow(1)};
      }
    `}

      ${(props) =>
    props.employee &&
    css`
      border: 1px solid ${oc.yellow[6]};
      background: white;
      color: ${oc.yellow[6]};

      &:hover {
        background: ${oc.yellow[6]};
        color: white;
        ${shadow(1)};
      }
    `}
  
  &:active {
    transform: translateY(3px);
  }

  & + & {
    margin-left: 0.5rem;
  }
`;
