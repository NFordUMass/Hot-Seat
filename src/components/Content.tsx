import { useState } from "react";
import type { Tables } from "../../supabase/types";
import Heat_Table from "./Heat_Table";

interface Props {
  source: Tables<"heat_index">[];
}

export default function Content({ source }: Props) {
  const [year, setYear] = useState(2024);

  return (
    <>
      {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
        <button key={year} onClick={() => setYear(year)} className="p-1">
          {year}
        </button>
      ))}
      <h2 className="text-lg lg:text-xl text-center">{`Showing Year: ${year}`}</h2>
      <Heat_Table source={source.filter((row) => row.year == year)} />
    </>
  );
}
