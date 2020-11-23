import React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { SavingWedding } from 'libs/types';
import shadow from 'styles/shadow';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

interface ButtonProps {
  menu?: boolean;
  remove?: boolean;
  patch?: boolean;
}

interface UpdateWeddingProps extends SavingWedding {
  setStartDate: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: React.MouseEvent) => void;
  onBack: () => void;
}

const UpdateWedding: React.FC<UpdateWeddingProps> = ({
  husband,
  bride,
  reserve_pay,
  husband_rental,
  bride_rental,
  husband_company,
  bride_company,
  husband_add,
  bride_add,
  husband_today,
  bride_today,
  husband_bouquet,
  bride_bouquet,
  husband_ceremony,
  bride_ceremony,
  husband_hanbok,
  bride_hanbok,
  husband_play,
  bride_play,
  husband_anthem,
  bride_anthem,
  husband_moderator,
  bride_moderator,
  husband_officiate,
  bride_officiate,
  husband_etc,
  bride_etc,
  husband_conv,
  bride_conv,
  meals_price,
  husband_num,
  bride_num,
  present_price,
  husband_present_num,
  bride_present_num,
  meal,
  reserve,
  present,
  wedding_at,
  event_at,
  setStartDate,
  onChange,
  onSubmit,
  onBack,
}) => {
  return (
    <WeddingBox>
      <h2 className="title">웨딩 정산</h2>

      <Content>
        <div className="name-pane">
          <span className="name">신랑님: </span>
          <strong>
            <input
              type="text"
              className="name"
              name="husband"
              value={husband}
              onChange={onChange}
              autoFocus
            />
          </strong>{' '}
          <span className="name"> 신부님: </span>
          <strong>
            <input type="text" className="name" name="bride" value={bride} onChange={onChange} />
          </strong>
        </div>

        <div className="date">
          <span>웨딩일자: </span>
          <DatePicker
            locale="ko"
            startDate={wedding_at}
            selected={wedding_at}
            onChange={setStartDate}
            dateFormat="yyyy, MM dd"
          />
          <span>웨딩시간: </span>
          <select name="event_at" value={event_at} onChange={onChange}>
            <option value="">전체</option>
            <option value="11:30">11:30</option>
            <option value="13:00">13:00</option>
            <option value="14:30">14:30</option>
            <option value="16:00">16:00</option>
            <option value="17:30">17:30</option>
            <option value="19:00">19:00</option>
          </select>
        </div>

        <hr style={{ width: '90%' }} />

        <h3>예식 비용</h3>
        <table>
          <tbody>
            <tr>
              <th>구분</th>
              <th className="basic" style={{ background: 'skyblue' }}>
                신랑
              </th>
              <th className="basic" style={{ background: 'pink' }}>
                신부
              </th>
              <th className="basic red">계</th>
            </tr>

            <tr>
              <th>웨딩홀 사용료</th>
              <td>
                <input
                  type="number"
                  name="husband_rental"
                  value={husband_rental}
                  onChange={onChange}
                />
              </td>
              <td>
                <input type="number" name="bride_rental" value={bride_rental} onChange={onChange} />
              </td>
              <td>
                {(husband_rental + bride_rental).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
            </tr>

            <tr>
              <th>웨딩업체</th>
              <td>
                <input
                  type="number"
                  name="husband_company"
                  value={husband_company}
                  onChange={onChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="bride_company"
                  value={bride_company}
                  onChange={onChange}
                />
              </td>
              <td>
                {(husband_company + bride_company).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </td>
            </tr>

            <tr>
              <th>웨딩업체 추가</th>
              <td>
                <input type="number" name="husband_add" value={husband_add} onChange={onChange} />
              </td>
              <td>
                <input type="number" name="bride_add" value={bride_add} onChange={onChange} />
              </td>
              <td>
                {(husband_add + bride_add).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
            </tr>

            <tr>
              <th>업체 당일추가</th>
              <td>
                <input
                  type="number"
                  name="husband_today"
                  value={husband_today}
                  onChange={onChange}
                />
              </td>
              <td>
                <input type="number" name="bride_today" value={bride_today} onChange={onChange} />
              </td>
              <td>
                {(husband_today + bride_today).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
            </tr>

            <tr>
              <th>부 케</th>
              <td>
                <input
                  type="number"
                  name="husband_bouquet"
                  value={husband_bouquet}
                  onChange={onChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="bride_bouquet"
                  value={bride_bouquet}
                  onChange={onChange}
                />
              </td>
              <td>
                {(husband_bouquet + bride_bouquet).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </td>
            </tr>

            <tr>
              <th>폐백음식</th>
              <td>
                <input
                  type="number"
                  name="husband_ceremony"
                  value={husband_ceremony}
                  onChange={onChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="bride_ceremony"
                  value={bride_ceremony}
                  onChange={onChange}
                />
              </td>
              <td>
                {(husband_ceremony + bride_ceremony)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </td>
            </tr>

            <tr>
              <th>한 복</th>
              <td>
                <input
                  type="number"
                  name="husband_hanbok"
                  value={husband_hanbok}
                  onChange={onChange}
                />
              </td>
              <td>
                <input type="number" name="bride_hanbok" value={bride_hanbok} onChange={onChange} />
              </td>
              <td>
                {(husband_hanbok + bride_hanbok).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
            </tr>

            <tr>
              <th>연 주</th>
              <td>
                <input type="number" name="husband_play" value={husband_play} onChange={onChange} />
              </td>
              <td>
                <input type="number" name="bride_play" value={bride_play} onChange={onChange} />
              </td>
              <td>
                {(husband_play + bride_play).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
            </tr>

            <tr>
              <th>축 가</th>
              <td>
                <input
                  type="number"
                  name="husband_anthem"
                  value={husband_anthem}
                  onChange={onChange}
                />
              </td>
              <td>
                <input type="number" name="bride_anthem" value={bride_anthem} onChange={onChange} />
              </td>
              <td>
                {(husband_anthem + bride_anthem).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
            </tr>

            <tr>
              <th>사회자</th>
              <td>
                <input
                  type="number"
                  name="husband_moderator"
                  value={husband_moderator}
                  onChange={onChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="bride_moderator"
                  value={bride_moderator}
                  onChange={onChange}
                />
              </td>
              <td>
                {(husband_moderator + bride_moderator)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </td>
            </tr>

            <tr>
              <th>주 례</th>
              <td>
                <input
                  type="number"
                  name="husband_officiate"
                  value={husband_officiate}
                  onChange={onChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="bride_officiate"
                  value={bride_officiate}
                  onChange={onChange}
                />
              </td>
              <td>
                {(husband_officiate + bride_officiate)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </td>
            </tr>

            <tr>
              <th>기 타</th>
              <td>
                <input type="number" name="husband_etc" value={husband_etc} onChange={onChange} />
              </td>
              <td>
                <input type="number" name="bride_etc" value={bride_etc} onChange={onChange} />
              </td>
              <td>
                {(husband_etc + bride_etc).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
            </tr>

            <tr>
              <th>컨벤션 당일</th>
              <td>
                <input type="number" name="husband_conv" value={husband_conv} onChange={onChange} />
              </td>
              <td>
                <input type="number" name="bride_conv" value={bride_conv} onChange={onChange} />
              </td>
              <td>
                {(husband_conv + bride_conv).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
            </tr>

            <tr>
              <th>총 예식비용</th>
              <td>
                {(
                  husband_rental +
                  husband_company +
                  husband_add +
                  husband_today +
                  husband_bouquet +
                  husband_ceremony +
                  husband_hanbok +
                  husband_play +
                  husband_anthem +
                  husband_moderator +
                  husband_officiate +
                  husband_etc +
                  husband_conv
                )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </td>
              <td>
                {(
                  bride_rental +
                  bride_company +
                  bride_add +
                  bride_today +
                  bride_bouquet +
                  bride_ceremony +
                  bride_hanbok +
                  bride_play +
                  bride_anthem +
                  bride_moderator +
                  bride_officiate +
                  bride_etc +
                  bride_conv
                )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </td>
              <td>
                {(
                  husband_rental +
                  husband_company +
                  husband_add +
                  husband_today +
                  husband_bouquet +
                  husband_ceremony +
                  husband_hanbok +
                  husband_play +
                  husband_anthem +
                  husband_moderator +
                  husband_officiate +
                  husband_etc +
                  husband_conv +
                  bride_rental +
                  bride_company +
                  bride_add +
                  bride_today +
                  bride_bouquet +
                  bride_ceremony +
                  bride_hanbok +
                  bride_play +
                  bride_anthem +
                  bride_moderator +
                  bride_officiate +
                  bride_etc +
                  bride_conv
                )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </td>
            </tr>
          </tbody>
        </table>

        <hr style={{ width: '90%' }} />

        <h3>식사비용</h3>
        <table>
          <tbody>
            <tr>
              <th>구분</th>
              <th className="basic" style={{ background: 'skyblue' }}>
                신랑
              </th>
              <th className="basic" style={{ background: 'pink' }}>
                신부
              </th>
              <th className="basic red">계</th>
            </tr>

            <tr>
              <th>식대 분할</th>
              <td className="sub" colSpan={3} style={{ textAlign: 'center' }}>
                <select name="meal" value={meal} onChange={onChange}>
                  <option value="privacy">각각 결제</option>
                  <option value="husband">신랑 결제</option>
                  <option value="bride">신부 결제</option>
                </select>
              </td>
            </tr>

            <tr>
              <th>식대 단가</th>
              <td className="sub" colSpan={3} style={{ textAlign: 'center' }}>
                <input
                  type="number"
                  name="meals_price"
                  value={meals_price}
                  onChange={onChange}
                  style={{ textAlign: 'center' }}
                />
              </td>
            </tr>

            <tr>
              <th>하객 인원</th>
              <td>
                <input type="number" name="husband_num" value={husband_num} onChange={onChange} />
              </td>
              <td>
                <input type="number" name="bride_num" value={bride_num} onChange={onChange} />
              </td>
              <td>
                {(husband_num + bride_num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}명
              </td>
            </tr>

            <tr>
              <th>식대 총 비용</th>
              <td>
                {(meals_price * husband_num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
              <td>
                {(meals_price * bride_num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
              <td>
                {(meals_price * (husband_num + bride_num))
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </td>
            </tr>
          </tbody>
        </table>

        <hr style={{ width: '90%' }} />

        <h3>답례품 비용</h3>
        <table>
          <tbody>
            <tr>
              <th>구분</th>
              <th className="basic" style={{ background: 'skyblue' }}>
                신랑
              </th>
              <th className="basic" style={{ background: 'pink' }}>
                신부
              </th>
              <th className="basic red">계</th>
            </tr>

            <tr>
              <th>답례품 분할</th>
              <td className="sub" colSpan={3} style={{ textAlign: 'center' }}>
                <select name="present" value={present} onChange={onChange}>
                  <option value="privacy">각각 결제</option>
                  <option value="husband">신랑 결제</option>
                  <option value="bride">신부 결제</option>
                </select>
              </td>
            </tr>

            <tr>
              <th>답례품 단가</th>
              <td className="sub" colSpan={3} style={{ textAlign: 'center' }}>
                <input
                  type="number"
                  name="present_price"
                  value={present_price}
                  onChange={onChange}
                  style={{ textAlign: 'center' }}
                />
              </td>
            </tr>

            <tr>
              <th>하객 인원</th>
              <td>
                <input
                  type="number"
                  name="husband_present_num"
                  value={husband_present_num}
                  onChange={onChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="bride_present_num"
                  value={bride_present_num}
                  onChange={onChange}
                />
              </td>
              <td>
                {(husband_present_num + bride_present_num)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                명
              </td>
            </tr>

            <tr>
              <th>답례품 총 비용</th>
              <td>
                {(present_price * husband_present_num)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </td>
              <td>
                {(present_price * bride_present_num)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </td>
              <td>
                {(present_price * (husband_present_num + bride_present_num))
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </td>
            </tr>
          </tbody>
        </table>

        <hr style={{ width: '90%' }} />

        <h3>예약금</h3>
        <table>
          <tbody>
            <tr>
              <th>구분</th>
              <th className="basic" style={{ background: 'skyblue' }}>
                신랑
              </th>
              <th className="basic" style={{ background: 'pink' }}>
                신부
              </th>
              <th className="basic red">계</th>
            </tr>

            <tr>
              <th>예약금 분할</th>
              <td className="sub" colSpan={3} style={{ textAlign: 'center' }}>
                <select name="reserve" value={reserve} onChange={onChange}>
                  <option value="half">예약금 반반</option>
                  <option value="husband">예약금 신랑</option>
                  <option value="bride">예약금 신부</option>
                </select>
              </td>
            </tr>

            <tr>
              <th>예약금</th>
              <td className="sub" colSpan={3} style={{ textAlign: 'center' }}>
                <input
                  type="number"
                  name="reserve_pay"
                  value={reserve_pay}
                  onChange={onChange}
                  style={{ textAlign: 'center' }}
                />
              </td>
            </tr>

            <tr>
              <th className="orange">반환 예약금</th>
              <td style={{ color: 'red' }}>
                {(function () {
                  if (reserve === 'half') {
                    return `-${(reserve_pay / 2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
                  } else if (reserve === 'husband') {
                    return `-${reserve_pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
                  } else {
                    return '0원';
                  }
                })()}
              </td>
              <td style={{ color: 'red' }}>
                {(function () {
                  if (reserve === 'half') {
                    return `-${(reserve_pay / 2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
                  } else if (reserve === 'husband') {
                    return '0원';
                  } else {
                    return `-${reserve_pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
                  }
                })()}
              </td>
              <td style={{ color: 'red' }}>
                -{reserve_pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </td>
            </tr>
          </tbody>
        </table>

        <hr style={{ width: '90%' }} />

        <h3 style={{ color: 'silver' }}>
          웨딩 총 비용:{' '}
          {(
            husband_rental +
            husband_company +
            husband_add +
            husband_today +
            husband_bouquet +
            husband_ceremony +
            husband_hanbok +
            husband_play +
            husband_anthem +
            husband_moderator +
            husband_officiate +
            husband_etc +
            husband_conv +
            bride_rental +
            bride_company +
            bride_add +
            bride_today +
            bride_bouquet +
            bride_ceremony +
            bride_hanbok +
            bride_play +
            bride_anthem +
            bride_moderator +
            bride_officiate +
            bride_etc +
            bride_conv +
            meals_price * (husband_num + bride_num) +
            present_price * (husband_present_num + bride_present_num) +
            bride_etc
          )
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          원
        </h3>

        <h3 style={{ color: 'blue' }}>
          결제 총 비용:{' '}
          {(
            husband_rental +
            husband_company +
            husband_add +
            husband_today +
            husband_bouquet +
            husband_ceremony +
            husband_hanbok +
            husband_play +
            husband_anthem +
            husband_moderator +
            husband_officiate +
            husband_etc +
            husband_conv +
            bride_rental +
            bride_company +
            bride_add +
            bride_today +
            bride_bouquet +
            bride_ceremony +
            bride_hanbok +
            bride_play +
            bride_anthem +
            bride_moderator +
            bride_officiate +
            bride_etc +
            bride_conv +
            meals_price * (husband_num + bride_num) +
            present_price * (husband_present_num + bride_present_num) +
            bride_etc -
            reserve_pay
          )
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          원
        </h3>

        <h3>
          신랑 총 결제비용:{' '}
          {(
            husband_rental +
            husband_company +
            husband_add +
            husband_today +
            husband_bouquet +
            husband_ceremony +
            husband_hanbok +
            husband_play +
            husband_anthem +
            husband_moderator +
            husband_officiate +
            husband_etc +
            husband_conv +
            (function () {
              if (meal === 'privacy') {
                return meals_price * husband_num;
              } else if (meal === 'husband') {
                return meals_price * (husband_num + bride_num);
              } else {
                return 0;
              }
            })() +
            (function () {
              if (present === 'privacy') {
                return present_price * husband_num;
              } else if (present === 'husband') {
                return present_price * (husband_present_num + bride_present_num);
              } else {
                return 0;
              }
            })() -
            (function () {
              if (reserve === 'half') {
                return reserve_pay / 2;
              } else if (reserve === 'husband') {
                return reserve_pay;
              } else {
                return 0;
              }
            })()
          )
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          원
        </h3>

        <h3>
          신부 총 결제비용:{' '}
          {(
            bride_rental +
            bride_company +
            bride_add +
            bride_today +
            bride_bouquet +
            bride_ceremony +
            bride_hanbok +
            bride_play +
            bride_anthem +
            bride_moderator +
            bride_officiate +
            bride_etc +
            bride_conv +
            (function () {
              if (meal === 'privacy') {
                return meals_price * bride_num;
              } else if (meal === 'husband') {
                return 0;
              } else {
                return meals_price * (husband_num + bride_num);
              }
            })() +
            (function () {
              if (present === 'privacy') {
                return present_price * bride_present_num;
              } else if (present === 'husband') {
                return 0;
              } else {
                return present_price * (husband_present_num + bride_present_num);
              }
            })() -
            (function () {
              if (reserve === 'half') {
                return reserve_pay / 2;
              } else if (reserve === 'husband') {
                return 0;
              } else {
                return reserve_pay;
              }
            })()
          )
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          원
        </h3>

        <ButtonPane>
          <Button remove onClick={onBack}>
            취소하기
          </Button>
          <Button menu onClick={onSubmit}>
            저장하기
          </Button>
        </ButtonPane>
      </Content>
    </WeddingBox>
  );
};

export default UpdateWedding;

// Styles
const WeddingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
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
  text-align: center;

  .name-pane {
    display: float;

    h3 {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
  }

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
    width: 100px;
    font-size: 0.9rem;
    overflow: hidden;
    text-align: right;

    &.sub {
      color: ${oc.blue[9]};
      font-weight: bold;
    }
  }

  input:not(.name) {
    width: 100%;
    border: none;
    text-align: right;
  }

  input.name {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border: 1px solid ${oc.pink[6]};
    border-radius: 4px;
  }

  select {
    padding-left: 1rem;
    padding-right: 1rem;
    border: none;
  }

  .none {
    display: none;
  }

  .date {
    margin-top: 1rem;
    margin-bottom: 1rem;

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

    select {
      width: 95px;
      height: 25px;
      border: 2px solid ${oc.teal[7]};
      background: ${oc.teal[5]};
      color: white;
      border-radius: 3px;
      text-align: center;
      margin-right: 10px;
    }
  }
`;

const ButtonPane = styled.div`
  display: inline-flex;
  float: right;
  margin-bottom: 1rem;
`;

const Button = styled.button<ButtonProps>`
  width: 100%;
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

  &:active {
    transform: translateY(3px);
  }

  & + & {
    margin-left: 0.5rem;
  }
`;
