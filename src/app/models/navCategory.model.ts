export interface AnimalCategory {
  id: number;
  animal: string;
  items: ServiceCategory[];
  image?: any;
}

export interface ServiceCategory {
  animal: number;
  service: string;
  items1: ServiceSubCategory[];
  image?: any;
}

export interface ServiceSubCategory {
  id: number;
  subcategory: string;
  image?: any;
  service: number;
}
