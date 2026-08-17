type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
};

export default function Field({
  label,
  name,
  value,
  onChange,
  required,
}: Props) {
  return (
    <label className="relative block w-full">
      <input
        type="text"
        inputMode="text"
        enterKeyHint="next"
        name={name}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="peer border-member text-text w-full border-0 border-b bg-transparent px-2.5 py-2.5 outline-none"
      />
      <span className="text-text peer-valid:text-success peer-focus:text-success pointer-events-none absolute top-3 left-0 transition-all peer-valid:-top-2.5 peer-valid:text-sm peer-focus:-top-2.5 peer-focus:text-sm">
        {label}
      </span>
      {required && <small className="text-error ml-1">필수</small>}
    </label>
  );
}
