import { Category } from '../types/features/main/category.types';
import { PromoCode, Banner } from '../types/features/main/promo.types';

export const banners: Banner[] = [
  {
    id: '1',
    title: 'Summer Sale!',
    subtitle: 'Get up to 50% off on selected items',
    image: '',
    link: '/catalog',
  },
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Rick & Morty',
    slug: 'rick-and-morty',
    image: '',
    productCount: 20,
  },
  {
    id: '2',
    name: 'Adventure Time',
    slug: 'adventure-time',
    image: '',
    productCount: 18,
  },
  {
    id: '3',
    name: 'Gravity Falls',
    slug: 'gravity-falls',
    image: '',
    productCount: 15,
  },
  {
    id: '4',
    name: 'South Park',
    slug: 'south-park',
    image: '',
    productCount: 22,
  },
  {
    id: '5',
    name: 'The Simpsons',
    slug: 'the-simpsons',
    image: '',
    productCount: 30,
  },
  {
    id: '6',
    name: 'Family Guy',
    slug: 'family-guy',
    image: '',
    productCount: 25,
  },
];

export const promoCodes: PromoCode[] = [
  {
    id: '1',
    code: 'WELCOME10',
    description: '10% off for new customers',
    discount: '10%',
    isActive: true,
  },
];
