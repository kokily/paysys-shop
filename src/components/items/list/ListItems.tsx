"use client";

import type { ItemRow } from "@/types/items";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { listItemsAction } from "@/actions/items";
import { useObserver } from "@/hooks/useObserver";
import ItemsFilter from "@/components/items/list/ItemFilter";
import ItemsTable from "@/components/items/list/ItemsTable";
import ItemDetailModal from "@/components/items/read/ItemDetailModal";
import ItemFormModal from "@/components/items/form/ItemFormModal";

type Props = {
  initialItems: ItemRow[];
  initialCursor: string | null;
  initialHasMore: boolean;
  name: string;
  divide: string;
  native: string;
};

type FormState = { mode: "create" } | { mode: "edit"; item: ItemRow } | null;

/** 품목 리스트 + 인피니트 스크롤 + 모달 CRUD */
export default function ListItems({
  initialItems,
  initialCursor,
  initialHasMore,
  name,
  divide,
  native,
}: Props) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [selected, setSelected] = useState<ItemRow | null>(null);
  const [form, setForm] = useState<FormState>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setItems(initialItems);
    setCursor(initialCursor);
    setHasMore(initialHasMore);
  }, [initialItems, initialCursor, initialHasMore, name, divide, native]);

  const loadMore = useCallback(() => {
    if (!hasMore || isPending || !cursor) return;

    startTransition(async () => {
      const result = await listItemsAction({
        name,
        divide,
        native,
        cursor,
      });
      if (!result.ok) return;

      setItems((prev) => [...prev, ...result.items]);
      setCursor(result.nextCursor);
      setHasMore(result.hasMore);
    });
  }, [cursor, divide, hasMore, isPending, name, native]);

  const onIntersect: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      if (entry?.isIntersecting) loadMore();
    },
    [loadMore],
  );

  const { setTarget } = useObserver({ onIntersect });

  function filterBy(key: "divide" | "native", value: string) {
    const qs = new URLSearchParams();
    if (name) qs.set("name", name);
    if (key === "divide") qs.set("divide", value);
    else if (divide) qs.set("divide", divide);
    if (key === "native") qs.set("native", value);
    else if (native) qs.set("native", native);
    router.push(qs.toString() ? `/items?${qs}` : "/items");
  }

  return (
    <div className="mb-4 flex w-full min-w-0 flex-col items-center">
      <h1 className="text-text text-center text-xl font-bold">품목 리스트</h1>
      <button
        type="button"
        onClick={() => setForm({ mode: "create" })}
        className="border-error text-error hover:bg-error mt-3 rounded-md border px-3 py-2 text-sm font-bold transition hover:text-white"
      >
        추 가
      </button>

      <ItemsFilter
        initialName={name}
        initialDivide={divide}
        initialNative={native}
      />

      <ItemsTable
        items={items}
        onSelect={setSelected}
        onFilterDivide={(d) => filterBy("divide", d)}
        onFilterNative={(n) => filterBy("native", n)}
      />

      {hasMore && (
        <div ref={setTarget} className="text-text-secondary py-6 text-sm">
          {isPending ? "불러오는 중..." : ""}
        </div>
      )}

      {selected && !form && (
        <ItemDetailModal
          item={selected}
          onClose={() => setSelected(null)}
          onEdit={() => setForm({ mode: "edit", item: selected })}
          onDeleted={(id) => {
            setItems((prev) => prev.filter((i) => i.id !== id));
            setSelected(null);
          }}
        />
      )}

      {form && (
        <ItemFormModal
          mode={form.mode}
          item={form.mode === "edit" ? form.item : undefined}
          onClose={() => setForm(null)}
          onSaved={(item) => {
            if (form.mode === "create") {
              setItems((prev) => [...prev, item].sort((a, b) => a.num - b.num));
            } else {
              setItems((prev) =>
                prev.map((i) => (i.id === item.id ? item : i)),
              );
              setSelected(item);
            }
            setForm(null);
          }}
        />
      )}
    </div>
  );
}
