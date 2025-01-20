import { useState } from "react";
import type { Tables } from "../../supabase/types.ts";
import { imgPath } from "../utils/database";
import CurrentRow from "./Row.tsx";

interface Props {
  source: Tables<"current">[];
}

const CoachesTable: React.FC<Props> = ({ source }) => {
  const [coaches, setCoaches] = useState<Tables<"current">[]>([]);

  return (
    <table className="w-full text-left">
      <thead>
        <tr className="font-mono text-base border-t border-b">
          <th>Coach</th>
          <th>Team</th>
          <th>Fire %</th>
        </tr>
      </thead>
      <tbody>{source?.map((row, index) => <CurrentRow current={row} />)}</tbody>
    </table>
  );
};

export default CoachesTable;
