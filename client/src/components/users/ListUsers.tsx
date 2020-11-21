import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { UserType } from 'libs/types';
import { media } from 'styles/media';
import shadow from 'styles/shadow';
import Search from 'components/common/Search';

interface ListUsersProps {
  users: UserType[] | null;
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDetail: (id: string) => void;
}

const ListUsers: React.FC<ListUsersProps> = ({
  users,
  search,
  onChange,
  onSearch,
  onKeyPress,
  onDetail,
}) => {
  return (
    <UsersBox>
      <h1>사용자 목록</h1>

      <Search
        mode="사용자 검색"
        search={search}
        onChange={onChange}
        onSearch={onSearch}
        onKeyPress={onKeyPress}
      />

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>성명</th>
            <th>가입일</th>
            <th>관리자</th>
          </tr>
        </thead>

        <tbody>
          {users && (users === null || users.length === 0) ? (
            <tr>
              <td colSpan={4}>사용자가 없습니다.</td>
            </tr>
          ) : (
            users?.map((user) => (
              <tr key={user.id} style={{ cursor: 'pointer' }} onClick={() => onDetail(user.id)}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>{user.admin ? '관리자' : '일반'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </UsersBox>
  );
};

export default ListUsers;

// Styles
const UsersBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 6rem;

  h1 {
    text-align: center;
  }

  .table {
    ${shadow(1)}
    margin-left: 5rem;
    margin-right: 5rem;

    ${media.medium} {
      margin-left: 0;
      margin-right: 0;
    }
    border-radius: 0.8rem;
    overflow: hidden;
  }

  tr {
    &:hover {
      background: rgba(255, 187, 0, 0.2);
    }
  }

  th,
  td {
    border-radius: 0.8rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
  }

  th {
    background: ${oc.cyan[6]};
    color: white;
  }
`;
