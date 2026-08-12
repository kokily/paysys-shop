import { NativeType } from "@/lib/data/native";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: ReactNode;
  native: NativeType;
  username: string;
  admin: boolean;
};

export default function PageTemplate({
  children,
  native,
  username,
  admin,
}: Props) {
  return (
    <div className="flex min-h-full flex-col items-center">
      <Header native={native} username={username} admin={admin} />

      <main className="mt-24 mb-24 w-full max-w-[1200px] px-4 md:px-8 print:m-0 print:max-w-none print:px-0">
        {children}
      </main>

      <Footer />
    </div>
  );
}
