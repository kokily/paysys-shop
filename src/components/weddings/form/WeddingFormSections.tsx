import type { WeddingFormInput } from "@/types/wedding";
import {
  MEAL_METHOD_OPTIONS,
  PRESENT_METHOD_OPTIONS,
  RESERVE_METHOD_OPTIONS,
} from "@/lib/wedding/constants";
import PairRow, { digitsOnly, formatDigits } from "./PairRow";

type Props = {
  form: WeddingFormInput;
  onChange: (name: keyof WeddingFormInput, value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const head = (
  <tr>
    <th>구 분</th>
    <th className="husband">신랑</th>
    <th className="bride">신부</th>
    <th className="total">계</th>
  </tr>
);

/** 예식·업체·식사·답례품·예약금·선입금 섹션 */
export default function WeddingFormSections({
  form,
  onChange,
  onKeyDown,
}: Props) {
  return (
    <>
      <section className="wedding-form-section">
        <h3>예식 비용</h3>
        <table className="wedding-form-table">
          <thead>{head}</thead>
          <tbody>
            <PairRow
              title="웨딩홀 사용료"
              husbandName="husband_hall"
              brideName="bride_hall"
              form={form}
              unit="원"
              onChange={onChange}
            />
            <PairRow
              title="예도물품"
              husbandName="husband_sword"
              brideName="bride_sword"
              form={form}
              unit="원"
              onChange={onChange}
            />
            <PairRow
              title="부 케"
              husbandName="husband_bouquet"
              brideName="bride_bouquet"
              form={form}
              unit="원"
              onChange={onChange}
            />
          </tbody>
        </table>
      </section>

      <section className="wedding-form-section">
        <h3>웨딩 업체</h3>
        <table className="wedding-form-table">
          <thead>{head}</thead>
          <tbody>
            <PairRow
              title="웨딩업체"
              husbandName="husband_company"
              brideName="bride_company"
              form={form}
              unit="원"
              onChange={onChange}
            />
            <PairRow
              title="혼주미용(여)"
              husbandName="husband_owner_woman"
              brideName="bride_owner_woman"
              form={form}
              unit="원"
              onChange={onChange}
            />
            <PairRow
              title="혼주미용(남)"
              husbandName="husband_owner_man"
              brideName="bride_owner_man"
              form={form}
              unit="원"
              onChange={onChange}
            />
            <PairRow
              title="액 자"
              husbandName="husband_frame"
              brideName="bride_frame"
              form={form}
              unit="원"
              onChange={onChange}
            />
            <PairRow
              title="원본파일"
              husbandName="husband_file"
              brideName="bride_file"
              form={form}
              unit="원"
              onChange={onChange}
            />
            <PairRow
              title="DVD"
              husbandName="husband_dvd"
              brideName="bride_dvd"
              form={form}
              unit="원"
              onChange={onChange}
            />
            <PairRow
              title="기타비용"
              husbandName="husband_etc"
              brideName="bride_etc"
              form={form}
              unit="원"
              onChange={onChange}
            />
          </tbody>
        </table>
      </section>

      <section className="wedding-form-section">
        <h3>식사 비용</h3>
        <table className="wedding-form-table">
          <thead>{head}</thead>
          <tbody>
            <tr>
              <th>식대분할</th>
              <td colSpan={3}>
                <select
                  value={form.meal_method}
                  onChange={(e) => onChange("meal_method", e.target.value)}
                  className="!text-center"
                >
                  {MEAL_METHOD_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.title}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>식대단가</th>
              <td colSpan={3}>
                <input
                  value={formatDigits(form.meal_price)}
                  onChange={(e) =>
                    onChange("meal_price", digitsOnly(e.target.value))
                  }
                  className="!text-center"
                />
              </td>
            </tr>
            <PairRow
              title="하객인원"
              husbandName="husband_meal"
              brideName="bride_meal"
              form={form}
              unit="명"
              comma={false}
              onChange={onChange}
            />
          </tbody>
        </table>
      </section>

      <section className="wedding-form-section">
        <h3>답례품 비용</h3>
        <table className="wedding-form-table">
          <thead>{head}</thead>
          <tbody>
            <tr>
              <th>답례품 분할</th>
              <td colSpan={3}>
                <select
                  value={form.present_method}
                  onChange={(e) => onChange("present_method", e.target.value)}
                  className="!text-center"
                >
                  {PRESENT_METHOD_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.title}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>답례품 단가</th>
              <td colSpan={3}>
                <input
                  value={formatDigits(form.present_price)}
                  onChange={(e) =>
                    onChange("present_price", digitsOnly(e.target.value))
                  }
                  className="!text-center"
                />
              </td>
            </tr>
            <PairRow
              title="하객인원"
              husbandName="husband_present"
              brideName="bride_present"
              form={form}
              unit="명"
              comma={false}
              onChange={onChange}
            />
          </tbody>
        </table>
      </section>

      <section className="wedding-form-section">
        <h3>예약금</h3>
        <table className="wedding-form-table">
          <thead>{head}</thead>
          <tbody>
            <tr>
              <th>예약금 분할</th>
              <td colSpan={3}>
                <select
                  value={form.reserve_method}
                  onChange={(e) => onChange("reserve_method", e.target.value)}
                  className="!text-center"
                >
                  {RESERVE_METHOD_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.title}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>예약금</th>
              <td colSpan={3}>
                <input
                  value={formatDigits(form.reserve_price)}
                  onChange={(e) =>
                    onChange("reserve_price", digitsOnly(e.target.value))
                  }
                  className="!text-center"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="wedding-form-section">
        <h3>선 입금</h3>
        <table className="wedding-form-table">
          <thead>{head}</thead>
          <tbody>
            <PairRow
              title="선 입금"
              husbandName="husband_pre_deposit"
              brideName="bride_pre_deposit"
              form={form}
              unit="원"
              onChange={onChange}
              onKeyDown={onKeyDown}
            />
          </tbody>
        </table>
      </section>
    </>
  );
}
