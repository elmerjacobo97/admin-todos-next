// https://tailwindcomponents.com/component/e-commerce-product-card

'use client';

import Image from 'next/image';
import { IoAddCircleOutline, IoTrashOutline } from 'react-icons/io5';
import { Product } from '../data/products';
import { Star } from '..';
import { addProductToCart, removeProductFromCart } from '../../shopping-cart/actions/cart-actions';
import { useRouter } from 'next/navigation';

interface Props {
  product: Product;
}

export const ProductCard = ({ product: { id, name, price, rating, image } }: Props) => {
  const router = useRouter();

  const addToCart = () => {
    addProductToCart(id);
    router.refresh();
  };

  const onRemoveFromCart = (id: string) => {
    removeProductFromCart(id);
    router.refresh();
  };

  return (
    <div className="shadow rounded-lg max-w-sm bg-gray-100 border-gray-100">
      <div className="p-2">
        <Image width={500} height={500} className="rounded" src={image} alt={`product - ${name} `} />
      </div>
      <div className="px-5 pb-5">
        <a href="#">
          <h3 className="text-gray-900 font-semibold text-xl tracking-tight">{name}</h3>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          {Array(rating)
            .fill(0)
            .map((_, index) => (
              <Star key={index} />
            ))}
          <span className="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3">{rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bol text-gray-600">${price.toFixed(2)}</span>
          <div className="flex">
            <button
              type="button"
              onClick={addToCart}
              className="text-white mr-2 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              <IoAddCircleOutline size={25} />
            </button>
            <button
              type="button"
              onClick={() => onRemoveFromCart(id)}
              className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
