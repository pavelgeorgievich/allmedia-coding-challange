export interface Payload {
  query: Query;
  response: Response;
}

export interface Query {
  pubid: string;
  appid: number;
  country: string;
  platform: 'all' | 'desktop' | 'mobile';
}

export interface Response {
  currency_name: string;
  offers_count: number;
  offers: Offer[];
}

export interface Offer {
  externalOfferId: string;
  name: string;
  description: string;
  requirements: string;
  disclaimer: string;
  offerUrlTemplate: string;
  offer_url_easy: string;
  payout: number;
  payout_type: string;
  amount: number;
  thumbnail: string;
  image_url_220x124: string;
  countries: string[];
  isDesktop: boolean;
  isAndroid: boolean;
  isIos: boolean;
  category: Record<string, string>;
  last_modified: number;
  preview_url: string;
  package_id: string;
  verticals: Vertical[];
}

export interface Vertical {
  vertical_id: string;
  vertical_name: string;
}
