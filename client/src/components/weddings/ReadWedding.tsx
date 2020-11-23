import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import shadow from 'styles/shadow';
import { WeddingType } from 'libs/types';
import RemoveModal from 'components/common/RemoveModal';

interface ButtonProps {
  menu?: boolean;
  patch?: boolean;
  remove?: boolean;
  back?: boolean;
}

interface ReadWeddingProps {
  wedding: WeddingType | null;
  onList: () => void;
  onBack: () => void;
  onUpdate: () => void;
  onRemove: () => void;
}

const ReadWedding: React.FC<ReadWeddingProps> = ({
  wedding,
  onList,
  onBack,
  onUpdate,
  onRemove,
}) => {
  const [modal, setModal] = useState(false);

  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <WeddingBox>
      <h2 className="title">웨딩 정산 내역</h2>

      {wedding && (
        <Content>
          <h3 className="name">
            신랑님: <strong>{wedding.husband}</strong> <strong style={{ color: 'pink ' }}>♡</strong>{' '}
            신부님: <strong>{wedding.bride}</strong>
          </h3>

          <h4>
            웨딩일시: {new Date(wedding.wedding_at).toLocaleDateString()}
            {wedding.event_at}
          </h4>

          <hr style={{ width: '90%' }} />

          <h3>웨딩비용</h3>
          <table>
            <tbody>
              <tr>
                <th colSpan={4}>예식비용</th>
                <th colSpan={4}>식사비용</th>
              </tr>

              <tr>
                <th>구분</th>
                <th className="basic">신랑</th>
                <th className="basic">신부</th>
                <th className="basic red">계</th>

                <th>구분</th>
                <th className="basic">신랑</th>
                <th className="basic">신부</th>
                <th className="basic red">계</th>
              </tr>

              <tr>
                <th>웨딩홀 사용료</th>
                <td>{wedding.husband_rental.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td>{wedding.bride_rental.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_rental.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>

                <th>식대 분할</th>
                <td className="sub" colSpan={3} style={{ textAlign: 'center' }}>
                  {(function () {
                    if (wedding.meal === 'privacy') {
                      return '각각 결제';
                    } else if (wedding.meal === 'husband') {
                      return '신랑 결제';
                    } else {
                      return '신부 결제';
                    }
                  })()}
                </td>
              </tr>

              <tr>
                <th>웨딩업체</th>
                <td>
                  {wedding.husband_company.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
                <td>{wedding.bride_company.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_company.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>

                <th>식대 단가</th>
                <td className="sub" colSpan={3} style={{ textAlign: 'center' }}>
                  {wedding.meals_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
              </tr>

              <tr>
                <th>웨딩업체 추가</th>
                <td>{wedding.husband_add.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td>{wedding.bride_add.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_add.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>

                <th>하객인원</th>
                <td>{wedding.husband_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}명</td>
                <td>{wedding.bride_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}명</td>
                <td className="sub">
                  {wedding.sum_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}명
                </td>
              </tr>

              <tr>
                <th>업체당일 추가</th>
                <td>{wedding.husband_today.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td>{wedding.bride_today.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_today.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>

                <th>식대 총 비용</th>
                <td>{wedding.husband_meal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td>{wedding.bride_meal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_meal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
              </tr>

              <tr>
                <th>부 케</th>
                <td>
                  {wedding.husband_bouquet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
                <td>{wedding.bride_bouquet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_bouquet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
              </tr>

              <tr>
                <th>폐백음식</th>
                <td>
                  {wedding.husband_ceremony.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
                <td>{wedding.bride_ceremony.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_ceremony.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>

                <th colSpan={4}>답례품 비용</th>
              </tr>

              <tr>
                <th>한 복</th>
                <td>{wedding.husband_hanbok.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td>{wedding.bride_hanbok.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_hanbok.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>

                <th>답례품 분할</th>
                <td className="sub" colSpan={3} style={{ textAlign: 'center' }}>
                  {(function () {
                    if (wedding.present === 'privacy') {
                      return '각각 결제';
                    } else if (wedding.present === 'husband') {
                      return '신랑 결제';
                    } else {
                      return '신부 결제';
                    }
                  })()}
                </td>
              </tr>

              <tr>
                <th>연 주</th>
                <td>{wedding.husband_play.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td>{wedding.bride_play.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_play.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>

                <th>답례품 단가</th>
                <td className="sub" colSpan={3} style={{ textAlign: 'center' }}>
                  {wedding.present_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
              </tr>

              <tr>
                <th>축 가</th>
                <td>{wedding.husband_anthem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td>{wedding.bride_anthem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_anthem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>

                <th>하객인원</th>
                <td>
                  {wedding.husband_present_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}명
                </td>
                <td>
                  {wedding.bride_present_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}명
                </td>
                <td className="sub">
                  {wedding.sum_present_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}명
                </td>
              </tr>

              <tr>
                <th>사회자</th>
                <td>
                  {wedding.husband_moderator.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
                <td>
                  {wedding.bride_moderator.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
                <td className="sub">
                  {wedding.sum_moderator.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>

                <th>답례품 총 비용</th>
                <td>
                  {wedding.husband_present.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
                <td>{wedding.bride_present.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_present.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
              </tr>

              <tr>
                <th>주 례</th>
                <td>
                  {wedding.husband_officiate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
                <td>
                  {wedding.bride_officiate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
                <td className="sub">
                  {wedding.sum_officiate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
              </tr>

              <tr>
                <th>기 타</th>
                <td>{wedding.husband_etc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td>{wedding.bride_etc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_etc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>

                <th colSpan={4}>예약금</th>
              </tr>

              <tr>
                <th>컨벤션 당일</th>
                <td>{wedding.husband_conv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td>{wedding.bride_conv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_conv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>

                <th>예약금 분할</th>
                <td className="sub" colSpan={3} style={{ textAlign: 'center' }}>
                  {(function () {
                    if (wedding.reserve === 'half') {
                      return '예약금 반반';
                    } else if (wedding.reserve === 'husband') {
                      return '예약금 신랑';
                    } else {
                      return '예약금 신부';
                    }
                  })()}
                </td>
              </tr>

              <tr>
                <th className="orange">총 예식비용</th>
                <td>
                  {wedding.husband_wedding.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
                <td>{wedding.bride_wedding.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</td>
                <td className="sub">
                  {wedding.sum_wedding.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>

                <th>예약금</th>
                <td style={{ color: 'red' }}>
                  -{wedding.husband_reserve.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
                <td style={{ color: 'red' }}>
                  -{wedding.bride_reserve.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
                <td className="sub" style={{ color: 'red' }}>
                  -{wedding.reserve_pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </td>
              </tr>
            </tbody>
          </table>

          <hr style={{ width: '90%' }} />

          <h3 style={{ color: 'silver ' }}>
            웨딩 총 비용:{' '}
            {(wedding.sum_wedding + wedding.sum_meal + wedding.sum_present)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원
          </h3>

          <h3 style={{ color: 'blue' }}>
            결제비용 총액:{' '}
            {(wedding.sum_wedding + wedding.sum_meal + wedding.sum_present - wedding.reserve_pay)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원
          </h3>

          <h3>
            신랑 총 결제비용:{' '}
            {(
              wedding.husband_wedding +
              (function () {
                if (wedding.meal === 'privacy') {
                  return wedding.husband_meal;
                } else if (wedding.meal === 'husband') {
                  return wedding.sum_meal;
                } else {
                  return 0;
                }
              })() +
              (function () {
                if (wedding.present === 'privacy') {
                  return wedding.husband_present;
                } else if (wedding.present === 'husband') {
                  return wedding.sum_present;
                } else {
                  return 0;
                }
              })() -
              wedding.husband_reserve
            )
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원
          </h3>

          <h3>
            신부 총 결제비용:{' '}
            {(
              wedding.bride_wedding +
              (function () {
                if (wedding.meal === 'privacy') {
                  return wedding.bride_meal;
                } else if (wedding.meal === 'husband') {
                  return 0;
                } else {
                  return wedding.sum_meal;
                }
              })() +
              (function () {
                if (wedding.present === 'privacy') {
                  return wedding.bride_present;
                } else if (wedding.present === 'husband') {
                  return 0;
                } else {
                  return wedding.sum_present;
                }
              })() -
              wedding.bride_reserve
            )
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원
          </h3>

          <ButtonPane>
            <Button menu onClick={onList}>
              목록으로
            </Button>
            <Button back onClick={onBack}>
              뒤로가기
            </Button>
            <Button patch onClick={onUpdate}>
              수정하기
            </Button>
            <Button remove onClick={onRemoveClick}>
              삭제하기
            </Button>
          </ButtonPane>
        </Content>
      )}

      <RemoveModal visible={modal} onCancel={onCancel} onConfirm={onConfirm} />
    </WeddingBox>
  );
};

export default ReadWedding;

const WeddingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 6rem;
  ${shadow(1)};
  animation: 0.3s ease-out 0s 1 fadeIn;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .title {
    font-size: 1.512rem;
    color: ${oc.violet[7]};
  }

  .name {
    text-align: center;
    strong {
      color: ${oc.cyan[7]};
    }
  }
`;

const Content = styled.div`
  table {
    font-size: 0.95rem;
  }

  tr {
    &:hover {
      background: rgba(165, 102, 255, 0.2);
    }
  }

  th,
  td {
    border: 1px solid ${oc.gray[4]};
    border-radius: 8px;
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
  }

  th {
    background: ${oc.violet[4]};
    color: white;
    width: 130px;
    &.basic {
      width: 93.3px;
    }
    &.orange {
      background: ${oc.orange[4]};
    }
    &.cyan {
      background: ${oc.cyan[4]};
    }
    &.red {
      background: ${oc.red[4]};
    }
  }

  td {
    width: 93.3px;
    font-size: 0.9rem;
    overflow: hidden;
    text-align: right;

    &.sub {
      color: ${oc.blue[9]};
      font-weight: bold;
    }
  }
`;

const ButtonPane = styled.div`
  margin-bottom: 1rem;
  display: inline-flex;
`;

const Button = styled.button<ButtonProps>`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 6px;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  transition: 0.2s all;

  ${(props) =>
    props.remove &&
    css`
      border: 1px solid ${oc.red[6]};
      background: white;
      color: ${oc.red[6]};

      &:hover {
        background: ${oc.red[6]};
        color: white;
        ${shadow(1)};
      }
    `}

  ${(props) =>
    props.menu &&
    css`
      border: 1px solid ${oc.indigo[6]};
      background: white;
      color: ${oc.indigo[6]};

      &:hover {
        background: ${oc.indigo[6]};
        color: white;
        ${shadow(1)};
      }
    `}

    ${(props) =>
    props.patch &&
    css`
      border: 1px solid ${oc.yellow[6]};
      background: white;
      color: ${oc.yellow[6]};

      &:hover {
        background: ${oc.yellow[6]};
        color: white;
        ${shadow(1)};
      }
    `}

      ${(props) =>
    props.back &&
    css`
      border: 1px solid ${oc.teal[6]};
      background: white;
      color: ${oc.teal[6]};

      &:hover {
        background: ${oc.teal[6]};
        color: white;
        ${shadow(1)};
      }
    `}

  &:active {
    transform: translateY(3px);
  }

  & + & {
    margin-left: 0.5rem;
  }
`;
