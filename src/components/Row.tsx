import type { Tables } from "../../supabase/types.ts";
import { imgPath } from "../utils/database";

interface Props {
  current: Tables<"heat_index">;
}

const CurrentRow: React.FC<Props> = ({ current }) => {
  return (
    <tr className="border-b border-neutral-600">
      <td>
        <img
          src={imgPath("nfl", current.team, 2024)}
          className="w-16"
          alt={current.team}
        />
      </td>
      <td className="text-xl font-bold">{current.name}</td>
      <td className="text-xl">{current.prob.toFixed(2)}</td>
    </tr>
  );
};

export default CurrentRow;
