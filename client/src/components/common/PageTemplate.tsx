import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { CHECK_ME, LOGOUT_USER } from 'graphql/auth';
import { setAccessToken } from 'libs/accessToken';
import { toast } from 'react-toastify';
import { media } from 'styles/media';
import UserMenu from './UserMenu';
import Header from './Header';

interface PageTemplateProps {}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
  const { data, loading } = useQuery(CHECK_ME);
  const [LogoutUser, { client }] = useMutation(LOGOUT_USER);

  const onLogout = async () => {
    try {
      await LogoutUser();
      setAccessToken('');
      await client?.clearStore();
      window.location.href = '/';
    } catch (err) {
      toast.error(err);
    }
  };

  if (loading) return null;

  return (
    <>
      {!loading && data.CheckMe.user && (
        <>
          <Header user={data.CheckMe.user} onLogout={onLogout} />
          <Main>{children}</Main>
          <UserMenu />
        </>
      )}
    </>
  );
};

export default PageTemplate;

// Styles
const Main = styled.main`
  margin: 6rem 5rem 0rem 5rem;

  ${media.medium} {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;
