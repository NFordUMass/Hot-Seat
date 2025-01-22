import type { Tables } from "../../supabase/types.ts";
import { imgPath } from "../utils/util";

interface Props {
  current: Tables<"heat_index">;
}

const CurrentRow: React.FC<Props> = ({ current }) => {
  return (
    <tr
      className="border-b border-neutral-600"
      style={{ backgroundColor: current.fired ? "red" : "inherit" }}
    >
      <td className="text-sm md:text-base lg:text-xl font-bold">
        {current.year}
      </td>
      <td className="px-0.5">
        <img
          src={imgPath("nfl", current.team, 2024)}
          className="w-8 lg:w-16"
          alt={current.team}
        />
      </td>
      <td className="text-sm md:text-base lg:text-xl font-bold">
        {current.name}
      </td>
      <td className="text-sm md:text-base lg:text-xl">
        {current.prob.toFixed(2)}
      </td>
      <td className="text-sm md:text-base lg:text-xl">
        {current.fired ? "Fired" : "Safe"}
      </td>
    </tr>
  );
};

export default CurrentRow;
