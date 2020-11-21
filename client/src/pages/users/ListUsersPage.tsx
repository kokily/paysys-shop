import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ListUsersContainer from 'containers/users/ListUsersContainer';

const ListUsersPage = () => {
  return (
    <PageTemplate>
      <ListUsersContainer />
    </PageTemplate>
  );
};

export default ListUsersPage;
