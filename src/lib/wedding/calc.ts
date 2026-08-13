import type {
  ReserveMethod,
  SplitMethod,
  Wedding,
  WeddingFormInput,
} from "@/types/wedding";

function toInt(value: string) {
  const n = Math.trunc(Number(value));
  return Number.isFinite(n) ? n : 0;
}

/** 이름 마스킹 (서버 저장용) */
export function maskName(name: string) {
  const trimmed = name.trim();
  const len = trimmed.length;
  if (len <= 1) return trimmed;
  if (len === 2) return `${trimmed[0]}*`;
  return `${trimmed[0]}${"*".repeat(len - 2)}${trimmed[len - 1]}`;
}

/** 예약금 분할 */
export function splitReserve(reservePrice: number, method: ReserveMethod) {
  switch (method) {
    case "half":
      return {
        husband_reserve: reservePrice / 2,
        bride_reserve: reservePrice / 2,
      };
    case "husband":
      return { husband_reserve: reservePrice, bride_reserve: 0 };
    case "bride":
      return { husband_reserve: 0, bride_reserve: reservePrice };
    default:
      return { husband_reserve: 0, bride_reserve: 0 };
  }
}

/** 폼 → DB 저장용 숫자 페이로드 (이름 마스킹 포함) */
export function formToWeddingData(form: WeddingFormInput) {
  const reserve_price = toInt(form.reserve_price);
  const { husband_reserve, bride_reserve } = splitReserve(
    reserve_price,
    form.reserve_method,
  );

  return {
    wedding_at: new Date(`${form.wedding_at}T00:00:00.000Z`),
    event_at__type__text: form.event_at,
    husband_name: maskName(form.husband_name),
    bride_name: maskName(form.bride_name),
    husband_image: null as string | null,
    bride_image: null as string | null,

    husband_hall: toInt(form.husband_hall),
    husband_sword: toInt(form.husband_sword),
    husband_bouquet: toInt(form.husband_bouquet),
    husband_company: toInt(form.husband_company),
    husband_owner_woman: toInt(form.husband_owner_woman),
    husband_owner_man: toInt(form.husband_owner_man),
    husband_frame: toInt(form.husband_frame),
    husband_file: toInt(form.husband_file),
    husband_dvd: toInt(form.husband_dvd),
    husband_etc: toInt(form.husband_etc),
    husband_meal: toInt(form.husband_meal),
    husband_present: toInt(form.husband_present),
    husband_reserve,
    husband_pre_deposit: toInt(form.husband_pre_deposit),

    bride_hall: toInt(form.bride_hall),
    bride_sword: toInt(form.bride_sword),
    bride_bouquet: toInt(form.bride_bouquet),
    bride_company: toInt(form.bride_company),
    bride_owner_woman: toInt(form.bride_owner_woman),
    bride_owner_man: toInt(form.bride_owner_man),
    bride_frame: toInt(form.bride_frame),
    bride_file: toInt(form.bride_file),
    bride_dvd: toInt(form.bride_dvd),
    bride_etc: toInt(form.bride_etc),
    bride_meal: toInt(form.bride_meal),
    bride_present: toInt(form.bride_present),
    bride_reserve,
    bride_pre_deposit: toInt(form.bride_pre_deposit),

    meal_method: form.meal_method,
    present_method: form.present_method,
    reserve_method: form.reserve_method,
    meal_price: toInt(form.meal_price),
    present_price: toInt(form.present_price),
    reserve_price,
  };
}

/** 예식비용(신랑/신부 각각) */
export function weddingConventionCost(wedding: Wedding) {
  const husband_cost =
    wedding.husband_hall +
    wedding.husband_sword +
    wedding.husband_bouquet +
    wedding.husband_company +
    wedding.husband_owner_woman +
    wedding.husband_owner_man +
    wedding.husband_frame +
    wedding.husband_file +
    wedding.husband_dvd +
    wedding.husband_etc;

  const bride_cost =
    wedding.bride_hall +
    wedding.bride_sword +
    wedding.bride_bouquet +
    wedding.bride_company +
    wedding.bride_owner_woman +
    wedding.bride_owner_man +
    wedding.bride_frame +
    wedding.bride_file +
    wedding.bride_dvd +
    wedding.bride_etc;

  return { husband_cost, bride_cost };
}

function splitByMethod(
  method: SplitMethod,
  unitPrice: number,
  husbandQty: number,
  brideQty: number,
) {
  const total = unitPrice * (husbandQty + brideQty);

  switch (method) {
    case "privacy":
      return {
        husband: unitPrice * husbandQty,
        bride: unitPrice * brideQty,
        total,
      };
    case "husband":
      return { husband: total, bride: 0, total };
    case "bride":
      return { husband: 0, bride: total, total };
    default:
      return { husband: total / 2, bride: total / 2, total };
  }
}

/** 총액 / 결제액 / 신랑·신부 결제액 */
export function weddingAllCost(wedding: Wedding) {
  const { husband_cost, bride_cost } = weddingConventionCost(wedding);

  const meal = splitByMethod(
    wedding.meal_method,
    wedding.meal_price,
    wedding.husband_meal,
    wedding.bride_meal,
  );
  const present = splitByMethod(
    wedding.present_method,
    wedding.present_price,
    wedding.husband_present,
    wedding.bride_present,
  );

  const all_cost = husband_cost + bride_cost + meal.total + present.total;
  const all_payment =
    all_cost -
    wedding.reserve_price -
    wedding.husband_pre_deposit -
    wedding.bride_pre_deposit;

  const husband_payment =
    husband_cost +
    meal.husband +
    present.husband -
    wedding.husband_reserve -
    wedding.husband_pre_deposit;

  const bride_payment =
    bride_cost +
    meal.bride +
    present.bride -
    wedding.bride_reserve -
    wedding.bride_pre_deposit;

  return {
    all_cost,
    all_payment,
    husband_payment,
    bride_payment,
    all_meal_cost: meal.total,
    all_present_cost: present.total,
  };
}

/** 분할 방식 한글 라벨 */
export function weddingMethodLabels(wedding: Wedding) {
  const mealLabel = (m: SplitMethod) => {
    if (m === "privacy") return "각각 결제";
    if (m === "husband") return "신랑 결제";
    if (m === "bride") return "신부 결제";
    return "반반 결제";
  };

  const reserveLabel = (m: ReserveMethod) => {
    if (m === "husband") return "예약금 신랑";
    if (m === "bride") return "예약금 신부";
    return "예약금 반반";
  };

  return {
    meal_method: mealLabel(wedding.meal_method),
    present_method: mealLabel(wedding.present_method),
    reserve_method: reserveLabel(wedding.reserve_method),
  };
}
