import type { seasonRow } from "../../supabase/types";

export type sortkey = "name" | "team" | "prob" | "fired" | 'year';

export interface Mode {
    by: "year" | "team";
}

export const Games = 17;
export const Records:string[] = Array.from({ length: 18 }).map((_, i) => `${i}-${Games - i}`);

export const Plyf_Round:string[] = [
    'Miss Playoffs',
    'Lose WC Round',
    'Lose Div Round',
    'Lose Title Game',
    'Lose Super Bowl',
    'Win Super Bowl'
]

const Team_Abbrevs:Map<string,string> = new Map<string,string>(
    [['CLT','IND'],['CRD','ARI'],['GNB','GB'],['HTX','HOU'],['NWE','NE'],['OTI','TEN'],['RAI','LV'],['RAM','LAR'],['RAV','BAL'],['SDG','LAC'],['SFO','SF'],['TAM','TB']]
);

const Team_Abbrevs_Reverse:Map<string,string> = new Map<string,string>(Array.from(Team_Abbrevs.entries()).map(([key,value])=> [value,key]))

export function get_abbrev(team:string,rev=false){
    return rev ? Team_Abbrevs_Reverse.has(team) ? Team_Abbrevs_Reverse.get(team) : team 
                : Team_Abbrevs.has(team) ? Team_Abbrevs.get(team) : team;
}

// TODO: make normal
export function get_random_input():[number,number]{
    const round = Math.floor(Math.random() * 6);
    let record = 0;
    if(round == 0){
        record = Math.floor(Math.random() * (11)) // 0-17 to 10-7
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