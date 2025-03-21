export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];


export type seasonRow = {
  // IDENTIFIERS
  id: string;
  year: number;
  name: string;
  team: string; // image path team abbrev
  tm: string; // display team abbrev

  // PREDICTION
  prob: number; // heat index score
  fired: number; // actual result 1 if fired
  pred: number; // ML prediction, 1 if fired

  // FEATURES
  age: number;
  poc:boolean; // person of color

  round: number; // playoff round 1 to 5
  win_pct: number;
  w_plyf: number;
  coy_share: number; // % of coach of year vote received
  coy_rank: number; // rank of coach of year vote
  srs: number; // simple rating system, approx strength of team
  gm: number; // how many gms in current tenure
  owner: number; // how many owners in current tenure
  ou: number; // how much team outperformed over/under

  exp: number; // total years coaching
  tenure: number; // exp with this team
  tenure_over_500: number; // mimics career win pct
  tenure_w_plyf: number;
  tenure_coy_share:number;
  exp_coy_share: number;

  delta_1yr_win_pct: number;
  delta_2yr_win_pct: number;
  delta_3yr_win_pct: number;
  delta_1yr_plyf: number; // change in playoff round from this year to 1 yr ago
  delta_2yr_plyf: number;
  delta_3yr_plyf: number;

  // MISC
  wins:number;
  losses:number;
  l_plyf: number;
  color1: string;
  color2: string;
  ou_line: number;
  win_pct_proj:number;
}

export type inputData = {
  // FEATURES
  age: number;
  poc:boolean; // person of color

  round: number; // playoff round 1 to 5
  win_pct: number;
  w_plyf: number;
  coy_share: number; // % of coach of year vote received
  coy_rank: number; // rank of coach of year vote
  srs: number; // simple rating system, approx strength of team
  gm: number; // how many gms in current tenure
  owner: number; // how many owners in current tenure
  ou: number; // how much team outperformed over/under

  exp: number; // total years coaching
  tenure: number; // exp with this team
  tenure_over_500: number; // mimics career win pct
  tenure_w_plyf: number;
  tenure_coy_share:number;
  exp_coy_share: number;

  delta_1yr_win_pct: number;
  delta_2yr_win_pct: number;
  delta_3yr_win_pct: number;
  delta_1yr_plyf: number; // change in playoff round from this year to 1 yr ago
  delta_2yr_plyf: number;
  delta_3yr_plyf: number;
}

export type coachRow = {
    id: string;
    name: string;
    years: number[];
    teams: string[];
    heat: number[];
    wins: number[];
    losses: number[];
    rounds: number[];
    wins_plyf: number[];
    losses_plyf:number[];
    win_pcts: number[];
    coy_ranks: number[];
    coy_shares: number[];
    outcomes: number[];
    colors_1: string[];
    colors_2: string[];
  };
  

export type Database = {
  public: {
    Tables: {
      coach_year: {
        Row: seasonRow;
        Insert: seasonRow;
        Update: seasonRow;
        Relationships: [];
      };
    };
    Views: {
      agg_by_coach_view: {
        Row: coachRow;
        Insert: coachRow;
        Update: coachRow;
        Relationships: [];
      };
    };
    Functions: {
      agg_by_coach: {
        Args: {};
        Returns: coachRow[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
