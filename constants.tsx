
import { ServiceCategory, NavLink } from './types';

export const DISCLAIMER_TEXT = "We are an independent third-party service provider offering assistance for HSRP number plate booking and related support services. We are not affiliated with, authorized by, or representing any government authority or official HSRP issuing body. Payments made here are service charges only.";

/** 
 * CONFIGURATION: GLOBAL DEFAULT UPI ID
 */
export const DEFAULT_UPI_ID = "paytm.s1q9k1f@pty";

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Installation', path: '/how-it-works' },
];

export const STATES_LIST = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Delhi", "Chandigarh"
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'hsrp-color',
    title: 'HSRP Number Plate With Colour Sticker',
    description: 'Complete assistance for both plate and mandated fuel-type stickers.',
    color: 'yellow',
    priceRange: { min: 1311, max: 1421 }
  },
  {
    id: 'two-wheel',
    title: 'Two-wheel Plate',
    description: 'Booking support specifically for bikes, scooters, and mopeds.',
    color: 'blue',
    priceRange: { min: 1111, max: 1121 }
  },
  {
    id: 'four-wheel',
    title: 'Four-wheel Plate',
    description: 'Assistance for cars, SUVs, and other four-wheeled passenger vehicles.',
    color: 'yellow',
    priceRange: { min: 1211, max: 1321 }
  },
  {
    id: 'stickers',
    title: 'Colour Stickers',
    description: 'Help with obtaining replacement or new mandated fuel-type stickers.',
    color: 'yellow',
    priceRange: { min: 811, max: 921 }
  },
  {
    id: 'heavy-duty',
    title: 'Heavy-duty Plate',
    description: 'Assistance for trucks, buses, and other commercial transport vehicles.',
    color: 'blue',
    priceRange: { min: 1311, max: 1421 }
  },
  {
    id: 'tractor',
    title: 'Tractor & Trailer Plate',
    description: 'Specific support for agricultural and construction equipment.',
    color: 'yellow',
    priceRange: { min: 1211, max: 1321 }
  },
  {
    id: 'electric',
    title: 'Electric Vehicle Plate',
    description: 'Green-plated assistance for eco-friendly electric motor vehicles.',
    color: 'blue',
    priceRange: { min: 1111, max: 1221 }
  },
  {
    id: 'replacement',
    title: 'Replacement Plate',
    description: 'Assistance for lost, damaged, or stolen HSRP plates.',
    color: 'yellow',
    priceRange: { min: 1311, max: 1421 }
  },
  {
    id: 'support',
    title: 'Order Status & Support',
    description: 'Check progress of your assistance request or get customer help.',
    color: 'blue',
    priceRange: { min: 0, max: 0 }
  },
];
