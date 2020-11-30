import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage = () => {
  return (
    <PageBox>
      <h2>
        올바르지 않은 페이지입니다
        <br /> 전표페이지로 이동합니다.
      </h2>

      <Link to="/soldier">페이지 이동</Link>
    </PageBox>
  );
};

export default NotFoundPage;

// Styles
const PageBox = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
