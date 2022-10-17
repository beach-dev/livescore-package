export interface TeamInfoType {
  id?: number;
  sport_id?: 2;
  category_id?: number;
  venue_id?: number;
  manager_id?: number;
  slug?: string;
  name?: string;
  has_logo?: boolean;
  logo?: string;
  name_translations: {
    en?: string;
  };
  name_short?: string;
  name_full?: string;
  name_code?: string;
  has_sub?: boolean;
  gender?: string;
  is_nationality?: boolean;
  country_code?: string;
  country?: string;
  flag?: string;
  foundation?: string;
}

export interface TeamScoreType {
  current?: number;
  display?: number;
  period_1?: number;
  period_1_tie_break?: number;
  period_2?: number;
  period_2_tie_break?: number;
  period_3?: number;
  period_3_tie_break?: number;
  period_4?: number;
  period_4_tie_break?: number;
  period_5?: number;
  period_5_tie_break?: number;
  normal_time?: number;
  point?: number;
}
