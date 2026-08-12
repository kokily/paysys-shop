"use client";

import { menu } from "@/lib/data/menu";
import { NativeType } from "@/lib/data/native";
import { MenuItemRow } from "@/types/menu";
import { useState } from "react";
import HomeItem from "./HomeItem";
import MenuListModal from "./MenuListModal";
import MenuAddModal from "./MenuAddModal";

type Props = {
  native: NativeType;
};

export default function HomeGrid({ native }: Props) {
  const [divide, setDivide] = useState<string | null>(null);
  const [selected, setSelected] = useState<MenuItemRow | null>(null);

  function closeAll() {
    setSelected(null);
    setDivide(null);
  }

  return (
    <div className="mt-4 mb-24">
      <div className="m-4 mb-4 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
        {menu.map((item) => (
          <HomeItem
            key={item.id}
            native={native}
            divide={item.divide}
            onSelect={setDivide}
          />
        ))}
      </div>

      {/* 1단계: selected 여부와 관계없이 유지 */}
      {divide && (
        <MenuListModal
          native={native}
          divide={divide}
          onClose={closeAll}
          onSelect={setSelected}
        />
      )}

      {/* 2단계: 1단계 위에 겹침 */}
      {selected && (
        <MenuAddModal
          item={selected}
          onBack={() => setSelected(null)}
          onClose={() => setSelected(null)}
          onAdded={() => setSelected(null)}
        />
      )}
    </div>
  );
}
