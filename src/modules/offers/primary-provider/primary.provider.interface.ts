export interface Payload {
  status: string;
  data: {
    [key: string]: OfferDetails;
  };
}

export interface OfferDetails {
  Offer: Offer;
  Country: Country;
  State: Geography;
  City: Geography;
  Connection_Type: ConnectionType;
  Device: Geography;
  OS: OperatingSystem;
}

export interface Offer {
  campaign_id: number;
  store_id: null | number;
  tracking_type: string;
  campaign_vertical: string;
  currency_name_singular: string;
  currency_name_plural: string;
  network_epc: string;
  icon: string;
  name: string;
  tracking_url: string;
  instructions: string;
  disclaimer: null | string;
  description: string;
  short_description: string;
  offer_sticker_text_1: string;
  offer_sticker_text_2: null | string;
  offer_sticker_text_3: null | string;
  offer_sticker_color_1: string;
  offer_sticker_color_2: string;
  offer_sticker_color_3: string;
  sort_order_setting: null | number;
  category_1: string;
  category_2: null | string;
  amount: number;
  payout_usd: number;
  start_datetime: string;
  end_datetime: string;
  is_multi_reward: boolean;
}

interface Country {
  include: {
    [key: string]: CountryDetails;
  };
  exclude: any[];
}

interface CountryDetails {
  id: number;
  code: string;
  name: string;
}

interface Geography {
  include: any[];
  exclude: any[];
}

interface ConnectionType {
  cellular: boolean;
  wifi: boolean;
}

interface OperatingSystem {
  android: boolean;
  ios: boolean;
  web: boolean;
  min_ios: null | string;
  max_ios: null | string;
  min_android: null | string;
  max_android: null | string;
}
