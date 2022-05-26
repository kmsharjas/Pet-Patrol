// export interface Cart {
//   id?: number;
//   customer_id: number;
//   customer_name: string;
//   customer_mobile: string;
//   customer_address: string;
//   items: CartItem[];
// }

export interface Payment {
  payment_method: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
  offerTitle?: 'N/A' | string;
  offerQuantity?: number;
}
