import { ReactNode } from "react";

type Props = {
  label: string;
  error?: string;
  children: ReactNode;
};

export default function Field({ label, error, children }: Props) {
  return (
    <label className="block">
      <span className="text-text-secondary mb-1 block text-sm font-semibold">
        {label}
      </span>
      {children}
      {error && <p className="text-error mt-1 text-xs">{error}</p>}
    </label>
  );
}
