import type { Wedding } from '@prisma/client';
import clsx from 'clsx';
import styles from '../styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversionUnit';

interface Props {
  wedding: Wedding;
}

export function First({ wedding }: Props) {
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th colSpan={4}>예식비용</th>
        </tr>

        <tr>
          <th>구분</th>
          <th className={clsx(styles.basic, styles.white)}>신랑</th>
          <th className={clsx(styles.basic, styles.white)}>신부</th>
          <th className={clsx(styles.basic, styles.white)}>계</th>
        </tr>

        <tr>
          <th>웨딩홀 사용료</th>
          <td>{unitOfAccount(wedding.rentalHusband, '원')}</td>
          <td>{unitOfAccount(wedding.rentalBride, '원')}</td>
          <td className={styles.sub}>
            {unitOfAccount(wedding.rentalHusband + wedding.rentalBride, '원')}
          </td>
        </tr>

        <tr>
          <th>예도칼</th>
          <td>{unitOfAccount(wedding.swordHusband, '원')}</td>
          <td>{unitOfAccount(wedding.swordBride, '원')}</td>
          <td className={styles.sub}>
            {unitOfAccount(wedding.swordHusband + wedding.swordBride, '원')}
          </td>
        </tr>

        <tr>
          <th>장 갑</th>
          <td>{unitOfAccount(wedding.gloveHusband, '원')}</td>
          <td>{unitOfAccount(wedding.gloveBride, '원')}</td>
          <td className={styles.sub}>
            {unitOfAccount(wedding.gloveHusband + wedding.gloveBride, '원')}
          </td>
        </tr>

        <tr>
          <th>예도칼 세트</th>
          <td>{unitOfAccount(wedding.swordSetHusband, '원')}</td>
          <td>{unitOfAccount(wedding.swordSetBride, '원')}</td>
          <td className={styles.sub}>
            {unitOfAccount(wedding.swordSetHusband + wedding.swordSetBride, '원')}
          </td>
        </tr>

        <tr>
          <th>부 케</th>
          <td>{unitOfAccount(wedding.bouquetHusband, '원')}</td>
          <td>{unitOfAccount(wedding.bouquetBride, '원')}</td>
          <td className={styles.sub}>
            {unitOfAccount(wedding.bouquetHusband + wedding.bouquetBride, '원')}
          </td>
        </tr>

        <tr>
          <th>웨딩업체</th>
          <td>{unitOfAccount(wedding.companyHusband, '원')}</td>
          <td>{unitOfAccount(wedding.companyBride, '원')}</td>
          <td className={styles.sub}>
            {unitOfAccount(wedding.companyHusband + wedding.companyBride, '원')}
          </td>
        </tr>

        <tr>
          <th>혼주미용</th>
          <td>{unitOfAccount(wedding.hostHusband, '원')}</td>
          <td>{unitOfAccount(wedding.hostBride, '원')}</td>
          <td className={styles.sub}>
            {unitOfAccount(wedding.hostHusband + wedding.hostBride, '원')}
          </td>
        </tr>

        <tr>
          <th>액 자</th>
          <td>{unitOfAccount(wedding.frameHusband, '원')}</td>
          <td>{unitOfAccount(wedding.frameBride, '원')}</td>
          <td className={styles.sub}>
            {unitOfAccount(wedding.frameHusband + wedding.frameBride, '원')}
          </td>
        </tr>

        <tr>
          <th>드레스</th>
          <td>{unitOfAccount(wedding.dressHusband, '원')}</td>
          <td>{unitOfAccount(wedding.dressBride, '원')}</td>
          <td className={styles.sub}>
            {unitOfAccount(wedding.dressHusband + wedding.dressBride, '원')}
          </td>
        </tr>

        <tr>
          <th>기 타</th>
          <td>{unitOfAccount(wedding.etcHusband, '원')}</td>
          <td>{unitOfAccount(wedding.etcBride, '원')}</td>
          <td className={styles.sub}>
            {unitOfAccount(wedding.etcHusband + wedding.etcBride, '원')}
          </td>
        </tr>

        <tr>
          <th className={styles.red}>총 예식비용</th>
          <td className={styles.cost}>
            {unitOfAccount(wedding.weddingHusbandCost, '원')}
          </td>
          <td className={styles.cost}>
            {unitOfAccount(wedding.weddingBrideCost, '원')}
          </td>
          <td className={styles.cost}>
            {unitOfAccount(
              wedding.weddingHusbandCost + wedding.weddingBrideCost,
              '원',
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
