import type { Wedding } from '@prisma/client';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { unitOfAccount } from '@/helpers/client/utils/conversionUnit';

interface Props {
  wedding: Wedding;
}

export function WeddingResult({ wedding }: Props) {
  let allCost =
    wedding.weddingHusbandCost +
    wedding.weddingBrideCost +
    wedding.mealsHusbandCost +
    wedding.mealsBrideCost;

  let payment = allCost - wedding.reserveHusbandCost - wedding.reserveBrideCost;

  let husbandCost =
    wedding.weddingHusbandCost +
    wedding.mealsHusbandCost -
    wedding.reserveHusbandCost;

  let brideCost =
    wedding.weddingBrideCost + wedding.mealsBrideCost - wedding.reserveBrideCost;

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td colSpan={4} rowSpan={9}>
            <h3 className={clsx(styles.title, styles.allCost)}>
              웨딩 총 비용: {unitOfAccount(allCost, '원')}
            </h3>
            <h3 className={clsx(styles.title, styles.result)}>
              결제 총 비용: {unitOfAccount(payment, '원')}
            </h3>
            <h3 className={clsx(styles.title)}>
              신랑 총 비용: {unitOfAccount(husbandCost, '원')}
            </h3>
            <h3 className={clsx(styles.title)}>
              신부 총 비용: {unitOfAccount(brideCost, '원')}
            </h3>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
