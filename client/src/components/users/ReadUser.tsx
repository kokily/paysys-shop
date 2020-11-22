import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { UserType } from 'libs/types';
import { media } from 'styles/media';
import shadow from 'styles/shadow';
import ReadButton from 'components/users/ReadButton';

interface ReadUserProps {
  user: UserType | null;
  onBack: () => void;
  onRemoveUser: () => void;
  onSetAdmin: () => void;
  onSetEmployee: () => void;
}

const ReadUser: React.FC<ReadUserProps> = ({
  user,
  onBack,
  onRemoveUser,
  onSetAdmin,
  onSetEmployee,
}) => {
  return (
    <UserBox>
      <WhiteBoard>
        <UserHeader>
          <h2>사용자 상세보기</h2>
        </UserHeader>

        <DownBorder />

        <ReadButton
          onBack={onBack}
          onRemove={onRemoveUser}
          onAdmin={onSetAdmin}
          onEmployee={onSetEmployee}
        />

        <Content>
          <table className="table">
            <tbody>
              {user ? (
                <>
                  <tr>
                    <th>ID</th>
                    <td>{user.id}</td>
                  </tr>
                  <tr>
                    <th>등급</th>
                    <td>{user.admin ? '관리자' : '일반'}</td>
                  </tr>
                  <tr>
                    <th>성명</th>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <th>가입</th>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={2}>데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </Content>
      </WhiteBoard>
    </UserBox>
  );
};

export default ReadUser;

// Styles
const UserBox = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 1rem;

  ${media.medium} {
    padding: 0.2rem;
  }
`;

const WhiteBoard = styled.div`
  ${shadow(1)};
  text-align: center;
  width: 80%;
  background: ${oc.indigo[1]};

  ${media.medium} {
    width: 100%;
  }
`;

const UserHeader = styled.div`
  h2 {
    font-size: 1.712rem;
  }
`;

const DownBorder = styled.div`
  margin-left: 5rem;
  margin-right: 5rem;
  margin-bottom: 1rem;
  height: 3px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.indigo[5]});

  ${media.medium} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const Content = styled.div`
  position: relative;
  width: 320px;
  margin: 36px auto;
  padding: 1rem;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  ${shadow(1)};

  .table {
    width: 100%;
    padding: 0;
    border-radius: 0.8rem;
    overflow: hidden;
  }

  tr:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  th,
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
  }

  th {
    background: ${oc.indigo[9]};
    color: white;
  }
`;
