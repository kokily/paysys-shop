"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initialTitle?: string;
  hall?: string;
  userId?: string;
};

/** 행사명 검색 */
export default function BillsSearch({
  initialTitle = "",
  hall = "",
  userId = "",
}: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);

  function push(nextTitle: string) {
    const qs = new URLSearchParams();

    if (nextTitle.trim()) qs.set("title", nextTitle.trim());
    if (hall) qs.set("hall", hall);
    if (userId) qs.set("userId", userId);
    
    router.push(qs.toString() ? `/fronts?${qs}` : "/fronts");
  }

  return (
    <div className="my-4 flex justify-center">
      <div className="flex w-[320px] overflow-hidden rounded-[10px] bg-[rgba(103,153,255,0.12)] p-[5px]">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") push(title);
          }}
          placeholder="행사명을 검색하세요"
          className="h-10 w-[250px] rounded-l-[3px] border-0 bg-[#3bc9db] px-[5px] py-[10px] text-base text-white outline-none placeholder:text-[#f8fafc] focus:bg-white focus:text-[#3bc9db]"
        />
        <button
          type="button"
          onClick={() => push(title)}
          className="h-10 w-[60px] rounded-r-[3px] border-0 border-l border-white bg-[#3bc9db] text-base text-white"
        >
          검색
        </button>
      </div>
    </div>
  );
}
