import clsx from 'clsx';
import styles from './styles.module.scss';
import { ContentDate } from './ContentDate';
import { ContentName } from './ContentName';
import { TableInput } from './common/TableInput';
import { TableSelect } from './common/TableSelect';
import { OneInput } from './common/OneInput';

interface Props {
  expense: ExpenseContents;
}

export function ExpenseContents({ expense }: Props) {
  const mealsProvider = [
    { title: '각각 결제', value: 'privacy' },
    { title: '신랑 결제', value: 'husband' },
    { title: '신부 결제', value: 'bride' },
    { title: '반반 결제', value: 'half' },
  ];

  const reserveProvider = [
    { title: '예약금 반반', value: 'half' },
    { title: '예약금 신랑', value: 'husband' },
    { title: '예약금 신부', value: 'bride' },
  ];

  return (
    <div className={styles.container}>
      <ContentName expense={expense} />
      <ContentDate expense={expense} />

      <hr className={styles.split} />

      <h2>웨딩비용</h2>

      <table>
        <thead>
          <tr>
            <th>구 분</th>
            <th className={clsx(styles.basic, styles.cyan)}>신랑</th>
            <th className={clsx(styles.basic, styles.red)}>신부</th>
            <th className={clsx(styles.basic, styles.sub)}>계</th>
          </tr>
        </thead>

        <tbody>
          <TableInput
            title="웨딩홀 사용료"
            husbandName="rentalHusband"
            husbandValue={expense.rentalHusband}
            brideName="rentalBride"
            brideValue={expense.rentalBride}
            onChange={expense.onChange}
            unit="원"
          />

          <TableInput
            title="예도칼"
            husbandName="swordHusband"
            husbandValue={expense.swordHusband}
            brideName="swordBride"
            brideValue={expense.swordBride}
            onChange={expense.onChange}
            unit="원"
          />

          <TableInput
            title="장 갑"
            husbandName="gloveHusband"
            husbandValue={expense.gloveHusband}
            brideName="gloveBride"
            brideValue={expense.gloveBride}
            onChange={expense.onChange}
            unit="원"
          />

          <TableInput
            title="예도칼 세트"
            husbandName="swordSetHusband"
            husbandValue={expense.swordSetHusband}
            brideName="swordSetBride"
            brideValue={expense.swordSetBride}
            onChange={expense.onChange}
            unit="원"
          />

          <TableInput
            title="부 케"
            husbandName="bouquetHusband"
            husbandValue={expense.bouquetHusband}
            brideName="bouquetBride"
            brideValue={expense.bouquetBride}
            onChange={expense.onChange}
            unit="원"
          />

          <TableInput
            title="웨딩업체"
            husbandName="companyHusband"
            husbandValue={expense.companyHusband}
            brideName="companyBride"
            brideValue={expense.companyBride}
            onChange={expense.onChange}
            unit="원"
          />

          <TableInput
            title="혼주미용"
            husbandName="hostHusband"
            husbandValue={expense.hostHusband}
            brideName="hostBride"
            brideValue={expense.hostBride}
            onChange={expense.onChange}
            unit="원"
          />

          <TableInput
            title="액 자"
            husbandName="frameHusband"
            husbandValue={expense.frameHusband}
            brideName="frameBride"
            brideValue={expense.frameBride}
            onChange={expense.onChange}
            unit="원"
          />

          <TableInput
            title="드레스"
            husbandName="dressHusband"
            husbandValue={expense.dressHusband}
            brideName="dressBride"
            brideValue={expense.dressBride}
            onChange={expense.onChange}
            unit="원"
          />

          <TableInput
            title="기 타"
            husbandName="etcHusband"
            husbandValue={expense.etcHusband}
            brideName="etcBride"
            brideValue={expense.etcBride}
            onChange={expense.onChange}
            unit="원"
          />
        </tbody>
      </table>

      <hr />

      <h2>식사 비용</h2>

      <table>
        <thead>
          <tr>
            <th>구 분</th>
            <th className={clsx(styles.basic, styles.cyan)}>신랑</th>
            <th className={clsx(styles.basic, styles.red)}>신부</th>
            <th className={clsx(styles.basic, styles.sub)}>계</th>
          </tr>
        </thead>

        <TableSelect
          title="식대분할"
          name="mealsMethod"
          value={expense.mealsMethod}
          onChange={expense.onChange}
          data={mealsProvider}
        />

        <OneInput
          title="식대단가"
          name="mealsPrice"
          value={expense.mealsPrice}
          onChange={expense.onChange}
        />

        <TableInput
          title="하객인원"
          husbandName="mealsHusband"
          husbandValue={expense.mealsHusband}
          brideName="mealsBride"
          brideValue={expense.mealsBride}
          onChange={expense.onChange}
          unit="원"
        />
      </table>

      <hr />

      <h2>식사 비용</h2>

      <table>
        <thead>
          <tr>
            <th>구 분</th>
            <th className={clsx(styles.basic, styles.cyan)}>신랑</th>
            <th className={clsx(styles.basic, styles.red)}>신부</th>
            <th className={clsx(styles.basic, styles.sub)}>계</th>
          </tr>
        </thead>

        <tbody>
          <TableSelect
            title="예약금 분할"
            name="reserveMethod"
            value={expense.reserveMethod}
            onChange={expense.onChange}
            data={reserveProvider}
          />

          <OneInput
            title="예약금"
            name="reservePrice"
            value={expense.reservePrice}
            onChange={expense.onChange}
          />
        </tbody>
      </table>
    </div>
  );
}
