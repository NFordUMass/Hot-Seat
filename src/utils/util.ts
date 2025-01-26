import type { seasonRow } from "../../supabase/types";

export type sortkey = "name" | "team" | "prob" | "fired" | 'year';

export interface Mode {
    by: "year" | "team";
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