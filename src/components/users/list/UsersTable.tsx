"use client";

import type { UserRow } from "@/types/user";

type Props = {
  users: UserRow[];
  onSelect: (user: UserRow) => void;
};

/** 사용자 리스트 테이블 */
export default function UsersTable({ users, onSelect }: Props) {
  return (
    <div
      className="mx-auto w-full max-w-[487px] p-[0.4rem]"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      }}
    >
      <table className="w-full overflow-hidden rounded-[0.8rem]">
        <thead>
          <tr>
            <th className="bg-member px-2 py-4 text-center font-semibold text-white">
              성명
            </th>
            <th className="bg-member px-2 py-4 text-center font-semibold text-white">
              가입일
            </th>
            <th className="bg-member px-2 py-4 text-center font-semibold text-white">
              관리자
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-text-secondary py-8 text-center">
                사용자가 없습니다
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                onClick={() => onSelect(user)}
                className="cursor-pointer hover:bg-[rgba(255,187,0,0.2)]"
              >
                <td className="text-text py-4 text-center">{user.username}</td>
                <td className="text-text py-4 text-center">
                  {new Date(user.created_at).toLocaleDateString("ko-KR")}
                </td>
                <td className="text-text py-4 text-center">
                  {user.admin ? "관리자" : "일반"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
