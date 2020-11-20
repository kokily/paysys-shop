import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';

interface DropItemProps {
  to?: string;
  red?: boolean;
  onClick?: () => void;
}

const DropItem: React.FC<DropItemProps> = ({ children, to, onClick }) => {
  const jsx = <ItemBox onClick={onClick}>{children}</ItemBox>;

  return to ? (
    <WrapperLink to={to} style={{ display: 'block' }}>
      {jsx}
    </WrapperLink>
  ) : (
    jsx
  );
};

export default DropItem;

// Styles
const WrapperLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const ItemBox = styled.div<DropItemProps>`
  padding: 0.75rem 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${oc.gray[9]};
  cursor: pointer;

  &:hover {
    background: ${oc.teal[1]};
  }
`;
