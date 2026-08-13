import { Metadata } from "next";
import { getCartAction } from "@/actions/cart";
import { requireAuth } from "@/lib/auth/require-auth";
import PageTemplate from "@/components/template/PageTemplate";
import CartView from "@/components/cart/list/CartView";

export const metadata: Metadata = {
  title: "전표확인 - 행사전표시스템",
};

/** /cart - 전표작성(카트) */
export default async function CartPage() {
  const user = await requireAuth();
  const result = await getCartAction();

  return (
    <PageTemplate native="member" username={user.username} admin={user.admin}>
      <CartView initialCart={result.cart} />
    </PageTemplate>
  );
}
