"use client";

import { useState } from "react";
import type { Tables } from "../../supabase/types.ts";
import Drop_Down from "./Drop_Down.tsx";
import Heat_Table from "./Heat_Table.tsx";

interface Props {
  source: Tables<"heat_index">[];
}

export default function Table_Wrapper({ source }: Props) {
  const [year, setYear] = useState(2024);

  return (
    <>
      <Drop_Down year={year} setYear={setYear} />
      <Heat_Table source={source.filter((row) => row.year == year)} />
    </>
  );
}
