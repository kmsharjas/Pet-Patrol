export interface Address {
  id?: number;
  cust_id: number;
  mobile: string;
  email: string;
  flat_no: string;
  landmark: string;
  city: string;
  pincode: string;
  state: number;
  add_type: number;
  isDefault?: boolean;
  country: number;
  country_name?: string;
  state_name?: string;
  type?: string;
}
