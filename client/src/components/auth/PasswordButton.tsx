import React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import shadow from '../../styles/shadow';

interface ButtonProps {
  submit?: boolean;
  cancel?: boolean;
}

interface PasswordButtonProps {
  onSubmit: (e: React.MouseEvent) => void;
  onCancel: () => void;
}

const PasswordButton: React.FC<PasswordButtonProps> = ({ onSubmit, onCancel }) => {
  return (
    <Container>
      <Button submit onClick={onSubmit}>
        다음
      </Button>
      <Button cancel onClick={onCancel}>
        취소
      </Button>
    </Container>
  );
};

export default PasswordButton;

const Container = styled.div`
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const Button = styled.button<ButtonProps>`
  font-size: 1rem;
  font-weight: bold;
  width: 80px;
  border-radius: 6px;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  transition: 0.2s all;
  &:active {
    transform: translateY(3px);
  }
  & + & {
    margin-left: 1rem;
  }
  ${(props) =>
    props.cancel &&
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
    props.submit &&
    css`
      border: 1px solid ${oc.violet[6]};
      background: white;
      color: ${oc.violet[6]};
      &:hover {
        background: ${oc.violet[6]};
        color: white;
        ${shadow(1)};
      }
    `}
`;
