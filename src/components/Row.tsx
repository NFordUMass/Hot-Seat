import type { Tables } from "../../supabase/types.ts";
import { imgPath } from "../utils/util";

interface Props {
  current: Tables<"heat_index">;
}

const CurrentRow: React.FC<Props> = ({ current }) => {
  return (
    <tr
      className="border-b border-neutral-600 px-2"
      style={{ backgroundColor: current.fired ? "#AA0000" : "inherit" }}
    >
      <td className="text-sm md:text-base lg:text-xl">{current.year}</td>
      <td>
        <img
          src={imgPath("transparent", current.team, 2024)}
          className="w-8 md:w-16"
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
