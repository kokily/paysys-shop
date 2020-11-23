import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';
import { ItemType } from 'libs/types';
import { media } from 'styles/media';
import Search from 'components/common/Search';

interface ListItemsProps {
  items: ItemType[] | null;
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDetail: (id: string) => void;
}

const ListItems: React.FC<ListItemsProps> = ({
  items,
  search,
  onChange,
  onSearch,
  onKeyPress,
  onDetail,
}) => {
  return (
    <ListItemsBox>
      <h1>상품 리스트</h1>

      <Search
        mode="품목 검색"
        search={search}
        onChange={onChange}
        onSearch={onSearch}
        onKeyPress={onKeyPress}
      />

      <AddButton to="/add">추가하기</AddButton>

      <table className="table">
        <thead>
          <tr>
            <th>분류</th>
            <th>구분</th>
            <th>상품명</th>
            <th>단위</th>
            <th>단가</th>
          </tr>
        </thead>

        <tbody>
          {items === null || items.length === 0 ? (
            <tr>
              <td colSpan={5}>데이터가 없습니다.</td>
            </tr>
          ) : (
            <>
              {items?.map((item, i) => (
                <tr key={i} style={{ cursor: 'pointer' }} onClick={() => onDetail(item.id)}>
                  <td>{item.divide}</td>
                  <td>{item.native}</td>
                  <td>{item.name}</td>
                  <td>{item.unit}</td>
                  <td>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </ListItemsBox>
  );
};

export default ListItems;

// Styles
const ListItemsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;

  h1 {
    text-align: center;
  }

  .table {
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
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
  }

  th {
    background: ${oc.cyan[6]};
    color: white;
  }
`;

const AddButton = styled(Link)`
  width: 120px;
  float: right;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.4rem 0.25rem;
  border: 2px solid ${oc.orange[8]};
  border-radius: 8px;
  text-align: center;
  color: ${oc.orange[8]};
  font-weight: 700;
  transition: 0.3s;

  &:hover {
    color: white;
    border: 2px solid ${oc.yellow[8]};
    background: ${oc.orange[8]};
  }
`;
