export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  actualPrice?: number;
  countInstock: number;
  animalCategory: number;
  serviceCategory: number;
  serviceSubcategory: number;
  included_gst: number;
  gstPercentage: number;
  offertitle: string;
  isProductiveactive: boolean;
  startDate: string;
  endDate: string;
  units: number;
  thumbnail_img: string;
  image: Image[];
}

interface Image {
  id: number;
  images: string;
  product: number;
}
