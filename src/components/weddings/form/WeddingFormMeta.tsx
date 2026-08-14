import type { WeddingFormInput } from "@/types/wedding";
import WeddingDateFilter from "../list/WeddingDateFilter";
import { EVENT_AT_OPTIONS } from "@/lib/wedding/constants";

type Props = {
  form: WeddingFormInput;
  onChange: (name: keyof WeddingFormInput, value: string) => void;
};

export default function WeddingFormMeta({ form, onChange }: Props) {
  return (
    <>
      <div className="wedding-form-meta">
        <label className="wedding-form-meta-item">
          <span>신랑님:</span>
          <input
            type="text"
            value={form.husband_name}
            onChange={(e) => onChange("husband_name", e.target.value)}
            placeholder="신랑 이름"
            autoFocus
          />
        </label>
        <label className="wedding-form-meta-item">
          <span>신부님:</span>
          <input
            type="text"
            value={form.bride_name}
            onChange={(e) => onChange("bride_name", e.target.value)}
            placeholder="신부 이름"
          />
        </label>
      </div>

      <div className="wedding-form-meta">
        <div className="w-full max-w-[600px]">
          <WeddingDateFilter
            value={form.wedding_at || null}
            onChange={(date) => onChange("wedding_at", date ?? "")}
          />
        </div>

        <label className="wedding-form-meta-item">
          <span>웨딩시간:</span>
          <select
            value={form.event_at}
            onChange={(e) => onChange("event_at", e.target.value)}
          >
            {EVENT_AT_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  );
}
