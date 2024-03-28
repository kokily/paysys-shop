import type { Wedding } from '@prisma/client';
import clsx from 'clsx';
import styles from '../styles.module.scss';
import { Vacuity } from '../Vacuity';
import { unitOfAccount } from '@/helpers/client/utils/conversionUnit';

interface Props {
  wedding: Wedding;
}

export function Second({ wedding }: Props) {
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th colSpan={4}>식사비용</th>
        </tr>

        <tr>
          <th>구분</th>
          <th className={clsx(styles.basic, styles.white)}>신랑</th>
          <th className={clsx(styles.basic, styles.white)}>신부</th>
          <th className={clsx(styles.basic, styles.white)}>계</th>
        </tr>

        <tr>
          <th>식대분할</th>
          <td className={clsx(styles.sub, styles.center)} colSpan={3}>
            {(function () {
              if (wedding.mealsMethod === 'privacy') {
                return '각각 결제';
              } else if (wedding.mealsMethod === 'husband') {
                return '신랑 결제';
              } else if (wedding.mealsMethod === 'bride') {
                return '신부 결제';
              } else {
                return '반반 결제';
              }
            })()}
          </td>
        </tr>

        <tr>
          <th>식대단가</th>
          <td className={clsx(styles.sub, styles.center)} colSpan={3}>
            {unitOfAccount(wedding.mealsPrice, '원')}
          </td>
        </tr>

        <tr>
          <th>하객인</th>
          <td>{wedding.mealsHusband}명</td>
          <td>{wedding.mealsBride}명</td>
          <td className={styles.sub}>
            {wedding.mealsHusband + wedding.mealsBride}명
          </td>
        </tr>

        <tr>
          <th>식대 총 비용</th>
          <td>{unitOfAccount(wedding.mealsHusbandCost, '원')}</td>
          <td>{unitOfAccount(wedding.mealsBrideCost, '원')}</td>
          <td className={styles.sub}>
            {unitOfAccount(wedding.mealsHusbandCost + wedding.mealsBrideCost, '원')}
          </td>
        </tr>

        <Vacuity />
        <Vacuity />
        <Vacuity />
        <Vacuity />

        <tr>
          <th colSpan={4}>예약금</th>
        </tr>

        <tr>
          <th>예약금 분할</th>
          <td className={clsx(styles.sub, styles.center)} colSpan={3}>
            {(function () {
              if (wedding.reserveMethod === 'half') {
                return '예약금 반반';
              } else if (wedding.reserveMethod === 'husband') {
                return '예약금 신랑';
              } else {
                return '예약금 신부';
              }
            })()}
          </td>
        </tr>

        <tr>
          <th>예약금</th>
          <td className={styles.red}>
            {(function () {
              if (wedding.reserveMethod === 'half') {
                return `-${unitOfAccount(wedding.reservePrice / 2, '원')}`;
              } else if (wedding.reserveMethod === 'husband') {
                return `-${unitOfAccount(wedding.reservePrice, '원')}`;
              } else {
                return `0원`;
              }
            })()}
          </td>
          <td className={styles.red}>
            {(function () {
              if (wedding.reserveMethod === 'half') {
                return `-${unitOfAccount(wedding.reservePrice / 2, '원')}`;
              } else if (wedding.reserveMethod === 'husband') {
                return `0원`;
              } else {
                return `-${unitOfAccount(wedding.reservePrice, '원')}`;
              }
            })()}
          </td>
          <td className={clsx(styles.sub, styles.red)}>
            -{unitOfAccount(wedding.reservePrice, '원')}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
