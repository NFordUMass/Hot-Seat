import type { coachRow, seasonRow } from "../../supabase/types";

export type sortkey = "name" | "team" | "prob" | "fired" | 'year';

export interface Mode {
    by: "year" | "team" | "heat";
}

export const Current_Year = 2025;
export const Games = 17;
export const Records:string[] = Array.from({ length: 18 }).map((_, i) => `${i}-${Games - i}`);

export const Plyf_Round:string[] = [
    'Misses Playoffs',
    'Loses WC Round',
    'Loses Div Round',
    'Loses Title Game',
    'Loses Super Bowl',
    'Wins Super Bowl'
]

const What_If_Init: Map<string, { 'record': number, 'round': number, 'seed': number }> = new Map<string, { 'record': number, 'round': number, 'seed': number }>([
    ['BowlTo0', { record: 7, round: 0, seed: 0.18 }],
    ['CallBr0', { record: 4, round: 0, seed: 0.18 }],
    ['CampDa1', { record: 10, round: 1, seed: 0.03 }],
    ['CanaDa0', { record: 3, round: 0, seed: 0.24 }],
    ['CarrPe0', { record: 5, round: 0, seed: 0.29 }],
    ['CoenLi0', { record: 4, round: 0, seed: 0.20 }],
    ['DaboBr0', { record: 9, round: 1, seed: 0.04 }],
    ['GannJo0', { record: 8, round: 0, seed: 0.20 }],
    ['GlenAa0', { record: 4, round: 0, seed: 0.22 }],
    ['HarbJi0', { record: 7, round: 0, seed: 0.26 }],
    ['HarbJo0', { record: 11, round: 1, seed: 0.11 }],
    ['JohnBe0', { record: 4, round: 0, seed: 0.28 }],
    ['LaFlMa0', { record: 8, round: 0, seed: 0.17 }],
    ['MacdMi0', { record: 4, round: 0, seed: 0.23 }],
    ['McDaMi0', { record: 4, round: 0, seed: 0.27 }],
    ['McDeSe0', { record: 10, round: 1, seed: 0.11 }],
    ['McVaSe0', { record: 5, round: 0, seed: 0.20 }],
    ['MoorKe0', { record: 5, round: 0, seed: 0.18 }],
    ['MorrRa0', { record: 5, round: 0, seed: 0.19 }],
    ['OConKe0', { record: 6, round: 0, seed: 0.20 }],
    ['PaytSe0', { record: 7, round: 0, seed: 0.18 }],
    ['QuinDa0', { record: 9, round: 1, seed: 0.06 }],
    ['ReidAn0', { record: 11, round: 2, seed: 0.12 }],
    ['RyanDe0', { record: 6, round: 0, seed: 0.20 }],
    ['SchoBr0', { record: 10, round: 1, seed: 0.03 }],
    ['ShanKy0', { record: 7, round: 0, seed: 0.21 }],
    ['SiriNi0', { record: 7, round: 0, seed: 0.29 }],
    ['StefKe0', { record: 5, round: 0, seed: 0.16 }],
    ['SteiSh0', { record: 5, round: 0, seed: 0.20 }],
    ['TaylZa0', { record: 9, round: 1, seed: 0.08 }],
    ['TomlMi0', { record: 9, round: 1, seed: 0.07 }],
    ['VrabMi0', { record: 11, round: 2, seed: 0.08 }]
]);


export function get_what_if_init(id:string):{'record':number,'round':number, 'seed': number}{
    return What_If_Init.has(id) ? What_If_Init.get(id) as {'record':number,'round':number, 'seed':number} : {'record':6,'round':0, 'seed': 0.2};
}

const Fix_Abbrevs:Map<string,string> = new Map<string,string>(
    [['CLT','IND'],['CRD','ARI'],['GNB','GB'],['HTX','HOU'],['NWE','NE'],['OTI','TEN'],['RAI','LV'],['RAM','LAR'],['RAV','BAL'],['SDG','LAC'],['SFO','SF'],['TAM','TB']]
);

export const Team_Abbrevs: Map<string, string> = new Map<string, string>([
    ['BUF', 'Buffalo Bills'],
    ['MIA', 'Miami Dolphins'],
    ['NYJ', 'New York Jets'],
    ['NWE', 'New England Patriots'],
    ['RAV', 'Baltimore Ravens'],
    ['PIT', 'Pittsburgh Steelers'],
    ['CIN', 'Cincinnati Bengals'],
    ['CLE', 'Cleveland Browns'],
    ['HTX', 'Houston Texans'],
    ['CLT', 'Indianapolis Colts'],
    ['JAX', 'Jacksonville Jaguars'],
    ['OTI', 'Tennessee Titans'],
    ['KAN', 'Kansas City Chiefs'],
    ['SDG', 'Los Angeles Chargers'],
    ['DEN', 'Denver Broncos'],
    ['RAI', 'Las Vegas Raiders'],
    ['PHI', 'Philadelphia Eagles'],
    ['WAS', 'Washington Commanders'],
    ['DAL', 'Dallas Cowboys'],
    ['NYG', 'New York Giants'],
    ['DET', 'Detroit Lions'],
    ['MIN', 'Minnesota Vikings'],
    ['GNB', 'Green Bay Packers'],
    ['CHI', 'Chicago Bears'],
    ['TAM', 'Tampa Bay Buccaneers'],
    ['ATL', 'Atlanta Falcons'],
    ['CAR', 'Carolina Panthers'],
    ['NOR', 'New Orleans Saints'],
    ['RAM', 'Los Angeles Rams'],
    ['SEA', 'Seattle Seahawks'],
    ['CRD', 'Arizona Cardinals'],
    ['SFO', 'San Francisco 49ers'],
  ]);

const Fix_Abbrevs_Reverse:Map<string,string> = new Map<string,string>(Array.from(Fix_Abbrevs.entries()).map(([key,value])=> [value,key]))

export function get_abbrev(team:string,rev=false){
    return rev ? Fix_Abbrevs_Reverse.has(team) ? Fix_Abbrevs_Reverse.get(team) : team 
                : Fix_Abbrevs.has(team) ? Fix_Abbrevs.get(team) : team;
}

export function filterCoachRowByYear(coach: coachRow, year: number): coachRow {
    // Find the last index where year is <= given year
    const lastIndex = coach.years.findIndex((y) => y > year);
    const endIndex = lastIndex === -1 ? coach.years.length : lastIndex; // If all years are valid, use full length
  
    // Helper function to slice arrays
    const sliceArray = <T>(arr: T[]) => arr.slice(0, endIndex);
  
    return {
      ...coach,
      years: sliceArray(coach.years),
      teams: sliceArray(coach.teams),
      heat: sliceArray(coach.heat),
      wins: sliceArray(coach.wins),
      losses: sliceArray(coach.losses),
      rounds: sliceArray(coach.rounds),
      wins_plyf: sliceArray(coach.wins_plyf),
      losses_plyf: sliceArray(coach.losses_plyf),
      win_pcts: sliceArray(coach.win_pcts),
      coy_ranks: sliceArray(coach.coy_ranks),
      coy_shares: sliceArray(coach.coy_shares),
      colors_1: sliceArray(coach.colors_1),
      colors_2: sliceArray(coach.colors_2),
    };
}
  

export function get_random_input():[number,number]{
    const raw = Math.floor(Math.random() * 10);
    const round = raw > 5 ? 0 : raw;
    let record = 0;
    
    // Use beta distribution to skew towards higher records
    const beta = () => {
        const u = Math.random();
        const v = Math.random();
        return Math.pow(u, 1/3) / (Math.pow(u, 1/3) + Math.pow(1-v, 1/3));
    };

    if(round == 0){
        // For non-playoff teams (0-17 to 10-7), skew towards middle-higher records
        record = Math.floor(beta() * 11); 
    }
    else {
        record = Math.floor(Math.random() * (9)) + 9; // 9-8 to 17-0
    }
    
    return [round,record];
}

// utils/imageUtils.ts
async function imageExists(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok; // Returns true if the status code is 200-299
    } catch (error) {
        return false;
    }
}

// utils/imageUtils.ts
export const DEFAULT_COACH_IMAGE = '/images/coaches/WalsBi0.png';

export async function get_coach_image(coachID: string): Promise<string> {
    const imagePath = `/images/coaches/${coachID}.png`;
    const exists = await imageExists(imagePath);

    return exists ? imagePath : DEFAULT_COACH_IMAGE;
}

export function imgPath(folder:string,abbrev:string,year=2024){
    return `/images/${folder}/${abbrev.toLowerCase()}-${year}.png`;
}

export function hexToRgba(hex:string, transparency = 0.2) {
    hex = hex.replace("#", "");
  
    // Convert HEX to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Return RGBA with transparency
    return `rgba(${r}, ${g}, ${b}, ${transparency})`;
}

interface sortingHelper {
    data: seasonRow[];
    setData: (rows: seasonRow[]) => void;
    sorted: {key: sortkey, dir: 'asc' | 'desc'};
    setSorted: (sorted: {key: sortkey, dir: 'asc' | 'desc'}) => void;
    key: sortkey;
    natural: 'asc' | 'desc'
}

export function handleSort(helper:sortingHelper) {
    let dir = helper.natural;
    if (helper.sorted.key == helper.key && helper.sorted.dir == helper.natural) {
      dir = helper.natural == "desc" ? "asc" : "desc";
    }
    helper.setSorted({ key: helper.key ,dir: dir });
    let i = dir == "asc" ? 1 : -1;
    helper.setData([...helper.data].sort((a:seasonRow, b:seasonRow) => (a[helper.key] < b[helper.key] ? i : -i)));
  }


export const teams: string[] = [
    'ATL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'CLT', 'CRD', 'DAL', 
    'DEN', 'DET', 'GNB', 'HTX', 'JAX', 'KAN', 'MIA', 'MIN', 'NOR', 
    'NWE', 'NYG', 'NYJ', 'OTI', 'PHI', 'PIT', 'RAI', 'RAM', 'RAV',
    'SDG', 'SEA', 'SFO', 'TAM', 'WAS'
  ];