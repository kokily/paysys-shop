import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { ItemType } from 'libs/types';
import { media } from 'styles/media';
import shadow from 'styles/shadow';
import ReadButton from './ReadButton';

interface ReadItemProps {
  item: ItemType;
  onList: () => void;
  onEdit: () => void;
  onRemoveItem: () => void;
}

const ReadItem: React.FC<ReadItemProps> = ({ item, onList, onEdit, onRemoveItem }) => {
  return (
    <ItemBox>
      <WhiteBoard>
        <ItemHeader>
          <h2>품목 상세보기</h2>
        </ItemHeader>

        <DownBorder />

        <ReadButton onList={onList} onEdit={onEdit} onRemove={onRemoveItem} />

        <Content>
          <table className="table">
            <tbody>
              {item && (
                <>
                  <tr>
                    <th>품명</th>
                    <td>{item.name}</td>
                  </tr>
                  <tr>
                    <th>출 신</th>
                    <td>{item.native}</td>
                  </tr>
                  <tr>
                    <th>구 분</th>
                    <td>{item.divide}</td>
                  </tr>
                  <tr>
                    <th>단 위</th>
                    <td>{item.unit}</td>
                  </tr>
                  <tr>
                    <th>단 가</th>
                    <td>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </Content>
      </WhiteBoard>
    </ItemBox>
  );
};

export default ReadItem;

// Styles
const ItemBox = styled.div`
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

const ItemHeader = styled.div`
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
  width: 300px;
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
