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
      <p className="text-sm md:text-base font-bold my-1">Trophy Case</p>
      <div className="flex flex-row gap-2 text-xs md:text-sm">
        {/* Postseason */}
        <div className="w-3/5 text-center">
          <p>{`Postseason Appearances: x${plyf_count}`}</p>
          {plyf_count == 0 ? null : (
            <div className="flex flex-row flex-wrap gap-1 justify-center">
              {Array.from({ length: plyf_count }).map((_, i) => (
                <img
                  key={i}
                  src={"images/misc/playoffs_blank.png"}
                  className="w-8 lg:w-12"
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
                className="w-4 lg:w-6"
                alt="coach of year trophy"
              />
            </div>
            <div className="text-center">
              <p className="text-2xl p-1">{coy_cumulative.toFixed(3)}</p>
            </div>
          </div>

          <div className="w-full flex flex-row text-center items-center lg:pt-1 my-0.5 mx-2">
            <div className="w-full">
              {coy_years.length === 0 ? null : (
                <>
                  <p className="text-[0.625rem] md:text-xs px-1 pb-1">
                    {"years receiving votes:"}
                  </p>
                  <div className="w-full grid grid-cols-auto-fit gap-0.5 text-center">
                    {coy_years.map((year, i) => (
                      <p
                        key={year}
                        className={`text-xs ${coy_ranks[i] === 1 ? "font-bold" : ""}`}
                      >
                        {year}
                      </p>
                    ))}
                  </div>
                  {Math.min(...coy_ranks.filter((rank) => rank > 0)) == 1 ? (
                    <p className="text-[0.625rem] md:text-xs italic px-1 py-1">
                      {"("}
                      <span className="font-bold">{"bold"}</span>
                      {" indicates winner)"}
                    </p>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
