"use client";

import { MdArrowDropDown } from "react-icons/md";

type Props = {
  onClick: () => void;
};

/** 어피치 아바타 버튼 (호버 시 user2.png) */
export default function Apeach({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center"
      aria-label="사용자 메뉴"
    >
      <span className="block h-10 w-10 rounded-full bg-[url('/user.png')] bg-cover bg-center transition-[background-image] duration-125 group-hover:bg-[url('/user2.png')]" />
      <MdArrowDropDown className="-mr-[0.4375rem] ml-1 text-2xl text-[#9e9e9e] transition group-hover:text-[#4d4d4d]" />
    </button>
  );
}
