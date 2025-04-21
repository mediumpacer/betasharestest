export interface SearchResultsResponse {
  results: SearchResult[];
  count: number;
}

export interface SearchResult {
  is_flagship_fund: boolean;
  flagship_description_short: string | null;
  flagship_description_long: string | null;
  flagship_image_url: string | null;
  is_betashares: boolean;
  issuer: string;
  fund_size: string | null;
  management_fee: string | null;
  classification: string;
  sub_classification: string;
  inception_date: string;
  dividend_frequency: string;
  investment_suitability: string;
  quick_ratio: number | null;
  current_ratio: number | null;
  price_to_book_ratio: number | null;
  market_capitalisation: number | null;
  sector: string | null;
  trailing_12m_dividend_yield: string | null;
  forward_12m_dividend_yield: string | null;
  management_approach: string;
  total_assets: number | null;
  total_revenue: number | null;
  pe_ratio_ttm: number | null;
  franking_credits: number | null;
  logo: string;
  symbol_openfigi: string;
  symbol: string;
  display_name: string;
  kind: string;
  asset_classes: string[];
  categories: string[];
  asset_categories: string[];
  asset_category_ids: string[];
  tags: string[];
  is_portfolio_excluded: boolean;
  is_auto_invest_included: boolean;
  currency: string;
  domicile: string;
  exchange: string;
  one_year_return: string | null;
  five_year_return: string | null;
}

export interface FilterOptions {
  fund_size: { min: string | null; max: string | null };
  management_fee: { min: string | null; max: string | null };
  one_year_return: { min: string | null; max: string | null };
  five_year_return: { min: string | null; max: string | null };
  asset_categories: string[];
  investment_suitability: string[];
  management_approach: string[];
  dividend_frequency: string[];
}
