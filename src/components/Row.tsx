import type { Tables } from "../../supabase/types.ts";
import { imgPath } from "../utils/database";

interface Props {
  current: Tables<"current">;
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
      <td className="text-xl">
        {(current.prob * 100).toPrecision(3)}
        <span className="text-base">%</span>
      </td>
    </tr>
  );
};

export default CurrentRow;
