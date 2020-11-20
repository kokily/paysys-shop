import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { CHECK_ME, LOGOUT_USER } from 'graphql/auth';
import { setAccessToken } from 'libs/accessToken';
import { toast } from 'react-toastify';
import { media } from 'styles/media';

interface PageTemplateProps {}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
  const history = useHistory();
  const { data, loading } = useQuery(CHECK_ME);
  const [LogoutUser, { client }] = useMutation(LOGOUT_USER);

  const onLogout = async () => {
    try {
      await LogoutUser();
      setAccessToken('');
      await client?.resetStore();
      history.push('/');
    } catch (err) {
      toast.error(err);
    }
  };

  if (loading) return null;

  return (
    <>
      {!loading && data.CheckMe.user && (
        <>
          <Main>{children}</Main>
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
