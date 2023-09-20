export type TCompany = {
  id: string;
  name: string;
  brewery_type: string;
  address_1: string;
  address_2: string | null;
  address_3: null | string;
  city: string;
  state_province: string;
  postal_code: number;
  country: string;
  longitude: number;
  latitude: number;
  phone: number;
  website_url: string;
  state: string;
  street: string;
};
