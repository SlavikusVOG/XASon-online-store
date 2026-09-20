import { FALLBACK_MONEY } from '../models/features/cart/cart.types';
import { Product } from '../models/features/catalog/product.types';

const defaultPrice = {
  ...FALLBACK_MONEY,
  centAmount: 4200,
};

export const catalogProducts: Product[] = [
  {
    id: '1',
    name: 'Item 1',
    image: '',
    description: 'Some description for a great item №1',
    isInCart: false,
    price: defaultPrice,
  },
  {
    id: '2',
    name: 'Item 2',
    image: '',
    description: 'Some description for a great item №2',
    isInCart: false,
    price: defaultPrice,
  },
  {
    id: '3',
    name: 'Item 3',
    image: '',
    description: 'Some description for a great item №3',
    isInCart: false,
    price: defaultPrice,
  },
  {
    id: '4',
    name: 'Item 4',
    image: '',
    description: 'Some description for a great item №4',
    isInCart: false,
    price: defaultPrice,
  },
  {
    id: '5',
    name: 'Item 5',
    image: '',
    description: 'Some description for a great item №5',
    isInCart: false,
    price: defaultPrice,
  },
  {
    id: '6',
    name: 'Item 6',
    image: '',
    description: 'Some description for a great item №6',
    isInCart: false,
    price: defaultPrice,
  },
];
