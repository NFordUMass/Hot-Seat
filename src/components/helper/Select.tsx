interface Props {
  name: string;
  value: number | string;
  id: string;
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectInput({
  name,
  value,
  id,
  options,
  onChange,
}: Props) {
  return (
    <select
      name={name}
      value={value}
      id={id}
      className="text-black text-xs md:text-lg lg:text-4xl"
      onChange={onChange}
    >
      {options.map((option, i) => (
        <option value={i} key={`${id}_${i}`} className="text-sm">
          {option}
        </option>
      ))}
    </select>
  );
}
