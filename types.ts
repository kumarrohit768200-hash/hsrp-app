
export interface PriceRange {
  min: number;
  max: number;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  color: 'yellow' | 'blue';
  icon?: string;
  priceRange: PriceRange;
  upiId?: string; // Optional per-service override
}

export interface NavLink {
  label: string;
  path: string;
}
