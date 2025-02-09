import type { coachRow } from "../../supabase/types";
import { imgPath } from "../utils/util";

interface Props {
  history: coachRow;
}

interface tableRow {
  team: string;
  start: number;
  stop: number;
  duration: number;
  wins: number;
  losses: number;
  wins_plyf: number;
  losses_plyf: number;
  // super_bowls: number; // TODO
}

export default function Coach_Awards({ history }: Props) {
  const plyf_count = history.rounds.reduce(
    (acc: number, e: number) => (e > 0 ? acc + 1 : acc),
    0
  );
  const [coy_cumulative, coy_years, coy_ranks] = history.coy_shares.reduce(
    (acc: [number, number[], number[]], e: number, i: number) => {
      acc[0] += e;
      if (e > 0) {
        acc[1].push(history.years[i]);
        acc[2].push(history.coy_ranks[i]);
      }
      return acc;
    },
    [0, [], []]
  );
  return (
    <div className="w-full text-center">
      <p className="text-lg font-bold">{"Trophy Case"}</p>
      <div className="flex flex-row gap-2">
        {/* Postseason */}
        <div className="w-3/5 text-center">
          <p>{`Postseason Appearances: x${plyf_count}`}</p>
          {plyf_count == 0 ? (
            "N/A"
          ) : (
            <div className="grid grid grid-cols-auto-fit gap-2 justify-center">
              {Array.from({ length: plyf_count }).map((_, i) => (
                <img
                  key={i}
                  src={"images/misc/playoffs_blank.png"}
                  className="w-full max-w-12 lg:max-w-16"
                  alt="playoff trophy"
                />
              ))}
            </div>
          )}
        </div>
        {/* Coach of Year Share */}
        <div className="w-2/5 items-center justify-center">
          <p>{"Coach of Year Share"}</p>
          <div className="flex flex-row justify-center items-center">
            <div className="">
              <img
                key="coach of year award"
                src="images/misc/coy.png"
                className="w-6 lg:w-9"
                alt="coach of year trophy"
              />
            </div>
            <div className="text-center">
              <p className="text-2xl p-1">{coy_cumulative.toFixed(3)}</p>
            </div>
          </div>

          <div className="w-full flex flex-row text-center items-center pt-1 my-1 mx-2">
            <div className="w-full">
              {coy_years.length === 0 ? (
                <p className="w-full text-xs text-center">{"None"}</p>
              ) : (
                <div className="w-full grid grid-cols-auto-fit gap-1 text-center">
                  {coy_years.map((year, i) => (
                    <p
                      key={year} // Added key to avoid React warnings
                      className={`text-xs ${coy_ranks[i] === 1 ? "font-bold" : ""}`}
                    >
                      {year}
                    </p>
                  ))}
                </div>
              )}
              <div className="text-center border border-collapse border-gray-500 my-1">
                <p className="text-xs px-1">{"years receiving votes"}</p>
                <p className="text-xs italic px-1">
                  <span className="font-bold">{"bold"}</span>
                  {" indicates winner"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
