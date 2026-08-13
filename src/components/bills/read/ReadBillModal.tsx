"use client";

import { useEffect, useState, useTransition } from "react";
import { getBillAction } from "@/actions/bills";
import type { BillDetail } from "@/types/bill";
import Modal from "@/components/ui/Modal";
import ReadBill from "@/components/bills/read/ReadBill";

type Props = {
  billId: string;
  meId: string;
  username: string;
  admin: boolean;
  onClose: () => void;
  onDeleted: (id: string) => void;
};

/** 전표 상세 팝업 (인쇄는 내부 .print-front만) */
export default function ReadBillModal({
  billId,
  meId,
  username,
  admin,
  onClose,
  onDeleted,
}: Props) {
  const [bill, setBill] = useState<BillDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getBillAction(billId);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setBill(result.bill);
    });
  }, [billId]);

  return (
    <Modal
      onClose={onClose}
      fullHeight
      printPortal
      maxWidthClassName="max-w-[960px]"
      headerClassName="bg-[#4c6ef5] no-print"
      title="전표세부내역"
    >
      {({ close }) => (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto p-4 print:overflow-visible print:p-0">
            {isPending && !bill && (
              <p className="text-text-secondary py-10 text-center text-sm">
                불러오는 중...
              </p>
            )}
            {error && (
              <p className="text-error py-10 text-center text-sm">{error}</p>
            )}
            {bill && (
              <ReadBill
                bill={bill}
                meId={meId}
                username={username}
                admin={admin}
                onClose={close}
                onDeleted={(id) => {
                  onDeleted(id);
                  close();
                }}
                onUpdated={setBill}
              />
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
