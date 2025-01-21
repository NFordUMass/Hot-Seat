"use client";

import type { Tables } from "../../supabase/types.ts";
import Drop_Down from "./Drop_Down.tsx";
import Heat_Table from "./Table.tsx";

interface Props {
  source: Tables<"heat_index">[];
}

export default function Table_Wrapper({ source }: Props) {
  return (
    <>
      <Drop_Down />
      <Heat_Table source={source} />
    </>
  );
}
