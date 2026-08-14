import type {
  MultiPaneType,
  OnePaneType,
  ResultPaneType,
  SubTitlePaneType,
  TitlePaneType,
  Wedding,
} from "@/types/wedding";
import {
  splitReserve,
  weddingConventionCost,
  weddingMethodLabels,
} from "@/lib/wedding/calc";
import { formatAmount } from "@/lib/format";

type Props = {
  wedding: Wedding;
};

export default function WeddingCostTables({ wedding }: Props) {
  const { husband_cost, bride_cost } = weddingConventionCost(wedding);
  const labels = weddingMethodLabels(wedding);
  const reserves = splitReserve(wedding.reserve_price, wedding.reserve_method);

  function TitlePane({ title }: TitlePaneType) {
    return (
      <tr>
        <th colSpan={4}>{title}</th>
      </tr>
    );
  }

  function SubTitlePane({ title, target, unit }: SubTitlePaneType) {
    return (
      <tr>
        <th>{title}</th>
        <td className="center" colSpan={3}>
          {typeof target === "string"
            ? target
            : formatAmount(target, unit && `${unit}`)}
        </td>
      </tr>
    );
  }

  function OnePane({ title, unit, target }: OnePaneType) {
    return (
      <tr>
        <th>{title}</th>
        <td className="center" colSpan={3}>
          {formatAmount(target, unit && `${unit}`)}
        </td>
      </tr>
    );
  }

  function MultiPane({ title, unit, husband, bride }: MultiPaneType) {
    return (
      <tr>
        <th>{title}</th>
        <td className={unit && "center"}>
          {formatAmount(husband, unit && `${unit}`)}
        </td>
        <td className={unit && "center"}>
          {formatAmount(bride, unit && `${unit}`)}
        </td>
        <td className={unit && "center"}>
          {formatAmount(husband + bride, unit && `${unit}`)}
        </td>
      </tr>
    );
  }

  function ResultPane({ title, husband, bride, target }: ResultPaneType) {
    return (
      <tr>
        <th className="white result">{title}</th>
        <td className="result">{formatAmount(target * husband)}</td>
        <td className="result">{formatAmount(target * bride)}</td>
        <td className="sub-result">
          {formatAmount(target * (husband + bride))}
        </td>
      </tr>
    );
  }

  return (
    <div className="read-wedding-contents">
      <table className="first-contents">
        <thead>
          <TitlePane title="웨딩 비용" />
        </thead>
        <tbody>
          <tr>
            <th>구 분</th>
            <th className="basic whnite">신랑</th>
            <th className="basic whnite">신부</th>
            <th className="basic whnite">계</th>
          </tr>
          <MultiPane
            title="웨딩홀 사용료"
            husband={wedding.husband_hall}
            bride={wedding.bride_hall}
          />
          <MultiPane
            title="예도물품"
            husband={wedding.husband_sword}
            bride={wedding.bride_sword}
          />
          <MultiPane
            title="부 케"
            husband={wedding.husband_bouquet}
            bride={wedding.bride_bouquet}
          />
          <TitlePane title="웨딩업체" />
          <MultiPane
            title="웨딩업체"
            husband={wedding.husband_company}
            bride={wedding.bride_company}
          />
          <MultiPane
            title="혼주미용(여)"
            husband={wedding.husband_owner_woman}
            bride={wedding.bride_owner_woman}
          />
          <MultiPane
            title="혼주미용(남)"
            husband={wedding.husband_owner_man}
            bride={wedding.bride_owner_man}
          />
          <MultiPane
            title="액 자"
            husband={wedding.husband_frame}
            bride={wedding.bride_frame}
          />
          <MultiPane
            title="원본파일"
            husband={wedding.husband_file}
            bride={wedding.bride_file}
          />
          <MultiPane
            title="DVD"
            husband={wedding.husband_dvd}
            bride={wedding.bride_dvd}
          />
          <MultiPane
            title="기타비용"
            husband={wedding.husband_etc}
            bride={wedding.bride_etc}
          />
          <TitlePane title="계" />
          <ResultPane
            title="총 예식비용"
            target={1}
            husband={husband_cost}
            bride={bride_cost}
          />
        </tbody>
      </table>

      <table className="second-contents">
        <thead>
          <TitlePane title="식사비용" />
        </thead>
        <tbody>
          <tr>
            <th>구 분</th>
            <th className="basic white">신랑</th>
            <th className="basic white">신부</th>
            <th className="basic white">계</th>
          </tr>

          <SubTitlePane title="식대분할" target={labels.meal_method} />
          <SubTitlePane title="식대단가" target={wedding.meal_price} />

          <MultiPane
            title="하객인원"
            unit="명"
            husband={wedding.husband_meal}
            bride={wedding.bride_meal}
          />

          <ResultPane
            title="총 식사비용"
            target={wedding.meal_price}
            husband={wedding.husband_meal}
            bride={wedding.bride_meal}
          />

          <TitlePane title="답례품 비용" />

          <SubTitlePane title="답례품 분할" target={labels.present_method} />
          <SubTitlePane title="답례품 단가" target={wedding.present_price} />

          <MultiPane
            title="하객인원"
            unit="명"
            husband={wedding.husband_present}
            bride={wedding.bride_present}
          />

          <ResultPane
            title="답례품 총 비용"
            target={wedding.present_price}
            husband={wedding.husband_present}
            bride={wedding.bride_present}
          />

          <TitlePane title="예약금" />

          <SubTitlePane title="예약금 분할" target={labels.reserve_method} />

          <MultiPane
            title="예약금"
            husband={reserves.husband_reserve}
            bride={reserves.bride_reserve}
          />

          <MultiPane
            title="선 입금"
            husband={wedding.husband_pre_deposit}
            bride={wedding.bride_pre_deposit}
          />
        </tbody>
      </table>
    </div>
  );
}
