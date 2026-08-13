"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initialUsername?: string;
};

export default function UsersSearch({ initialUsername = "" }: Props) {
  const router = useRouter();
  const [username, setUsername] = useState(initialUsername);

  function onSearch() {
    const qs = new URLSearchParams();

    if (username.trim()) qs.set("username", username.trim());

    router.push(qs.toString() ? `/users?${qs}` : "/users");
  }

  return (
    <div className="my-4 flex justify-center">
      <div className="flex w-[320px] overflow-hidden rounded-[10px] bg-[rgba(103,153,255,0.12)] p-[5px]">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
          placeholder="성명 검색"
          className="h-10 w-[250px] rounded-l-[3px] border-0 bg-[#3bc9db] px-[5px] py-[10px] text-base text-white outline-none placeholder:text-[#f8fafc] focus:bg-white focus:text-[#3bc9db]"
        />
        <button
          type="button"
          onClick={onSearch}
          className="relative h-10 w-[60px] rounded-r-[3px] border-0 border-l border-white bg-[#3bc9db] text-base text-white"
        >
          검색
        </button>
      </div>
    </div>
  );
}
