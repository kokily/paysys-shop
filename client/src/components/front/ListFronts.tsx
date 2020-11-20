import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { media } from 'styles/media';
import Search from 'components/common/Search';
import { BillType } from 'libs/types';

interface ListFrontsProps {
  fronts: BillType[] | null;
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent) => void;
  onUserList: (user_id: string) => void;
  onHallList: (hall: string) => void;
  onDetail: (id: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ListFronts: React.FC<ListFrontsProps> = ({
  fronts,
  search,
  onChange,
  onSearch,
  onUserList,
  onHallList,
  onDetail,
  onKeyPress,
}) => {
  return (
    <ListBox>
      <h2>프런트 전표 현황</h2>

      <Search
        mode="행사명"
        search={search}
        onChange={onChange}
        onSearch={onSearch}
        onKeyPress={onKeyPress}
      />

      <table className="table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>행사명</th>
            <th>장소</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {fronts === null || fronts.length === 0 ? (
            <tr>
              <td colSpan={4}>작성된 전표가 없습니다.</td>
            </tr>
          ) : (
            <>
              {fronts.map((front, i) => (
                <tr key={i}>
                  <td>{new Date(front.created_at).toLocaleDateString()}</td>
                  <td>
                    <strong onClick={() => onDetail(front.id)}>
                      {front.title.length > 20 ? (
                        <>{front.title.slice(0, 20)}...</>
                      ) : (
                        <>{front.title}</>
                      )}
                    </strong>
                  </td>
                  <td className="link" onClick={() => onHallList(front.hall)}>
                    {front.hall}
                  </td>
                  <td className="link" onClick={() => onUserList(front.user_id)}>
                    {front.username} 님
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </ListBox>
  );
};

export default ListFronts;

// Styles
const ListBox = styled.div`
  margin-top: 1rem;
  margin-bottom: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;

  ${media.xsmall} {
    width: 100%;
  }

  .table {
    width: 100%;
    padding: 0;
    border-radius: 0.8rem;
    overflow: hidden;
  }

  th,
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
    overflow: hidden;
  }

  th {
    min-width: 50px;
    background: ${oc.cyan[7]};
    color: white;
  }

  td {
    strong {
      color: ${oc.cyan[9]};
      transition: 0.3s;
      overflow: hidden;
      padding: 0.3rem;
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background: ${oc.cyan[7]};
        color: white;
      }
    }

    a {
      font-weight: bold;
      color: ${oc.grape[9]};
      text-decoration: none;

      &:hover {
        color: ${oc.red[9]};
      }
    }

    &.link {
      cursor: pointer;
      color: ${oc.cyan[7]};

      &:hover {
        color: ${oc.cyan[5]};
      }

      &:active {
        transform: translateY(2px);
      }
    }
  }
`;
