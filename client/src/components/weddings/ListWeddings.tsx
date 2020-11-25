import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';
import { WeddingType } from 'libs/types';

interface ListWeddingsProps {
  weddings: WeddingType[] | null;
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDetail: (id: string) => void;
}

const ListWeddings: React.FC<ListWeddingsProps> = ({
  weddings,
  search,
  onChange,
  onSearch,
  onKeyPress,
  onDetail,
}) => {
  return (
    <WeddingBox>
      <h2>웨딩 빌지 리스트</h2>

      <Search search={search} onChange={onChange} onSearch={onSearch} onKeyPress={onKeyPress} />

      <Content>
        <table className="table">
          <thead>
            <tr>
              <th>웨딩일자</th>
              <th>웨딩시간</th>
              <th>신랑</th>
              <th>신부</th>
            </tr>
          </thead>

          <tbody>
            {weddings === null || weddings.length === 0 ? (
              <tr>
                <td colSpan={4}>데이터가 없습니다.</td>
              </tr>
            ) : (
              <>
                {weddings.map((wedding) => (
                  <tr key={wedding.id}>
                    <td>
                      <strong onClick={() => onDetail(wedding.id)}>{wedding.wedding_at}</strong>
                    </td>
                    <td>{wedding.event_at}</td>
                    <td>{wedding.husband}</td>
                    <td>{wedding.bride}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </Content>
    </WeddingBox>
  );
};

const Search = ({ search, onChange, onSearch, onKeyPress }) => (
  <SearchPane>
    <input type="text" name="search" value={search} onChange={onChange} onKeyPress={onKeyPress} />
    <button onClick={onSearch}>검 색</button>
    <Link to="/expense">웨딩추가</Link>
  </SearchPane>
);

export default ListWeddings;

// Styles
const WeddingBox = styled.div`
  h2 {
    text-align: center;
  }
`;

const Content = styled.div`
  max-width: 600px;
  margin: 20px auto;

  .table {
    width: 100%;
    padding: 0;
    margin-bottom: 1.5rem;
    border-radius: 0.8rem;
    overflow: hidden;
  }

  th,
  td {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: center;
  }

  th {
    background: ${oc.violet[7]};
    color: white;
  }

  td {
    strong {
      color: ${oc.violet[7]};
      transition: 0.3s;
      overflow: hidden;
      padding: 0.3rem;
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background: ${oc.violet[7]};
        color: white;
      }
    }

    a {
      font-weight: bold;
      color: ${oc.violet[7]};

      &:hover {
        color: ${oc.red[7]};
      }
    }
  }
`;

const SearchPane = styled.div`
  width: 300px;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;

  input {
    width: 95px;
    height: 25px;
    border: 2px solid ${oc.cyan[7]};
    background: ${oc.cyan[5]};
    color: white;
    border-radius: 3px;
    text-align: center;
    margin-right: 10px;
  }

  a {
    width: 95px;
    float: 1;
    margin: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem 0.25rem 0.4rem 0.25rem;
    border: 2px solid ${oc.red[8]};
    border-radius: 8px;
    text-align: center;
    color: ${oc.red[8]};
    font-weight: 700;
    transition: 0.3s;

    &:hover {
      color: white;
      border: 2px solid ${oc.orange[8]};
      background: ${oc.red[8]};
    }
  }

  button {
    width: 95px;
    float: 1;
    font-size: 0.9rem;
    margin: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-right: 1rem;
    padding: 0.5rem 0.25rem 0.4rem 0.25rem;
    border: 2px solid ${oc.teal[8]};
    border-radius: 8px;
    text-align: center;
    color: ${oc.teal[8]};
    font-weight: 700;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      color: white;
      border: 2px solid ${oc.cyan[8]};
      background: ${oc.teal[8]};
    }
  }
`;
