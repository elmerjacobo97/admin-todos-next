'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoAddCircleOutline, IoRemove } from 'react-icons/io5';
import { Product } from '@/products/data/products';
import { addProductToCart } from '@/shopping-cart';
import { removeSingleItemFromCart } from '@/shopping-cart/actions/cart-actions';

interface Props {
  product: Product;
  quantity: number;
}

export const ItemCard = ({ product, quantity }: Props) => {
  const router = useRouter();

  function onAddToCart() {
    addProductToCart(product.id);
    router.refresh();
  }

  function onRemoveItem() {
    removeSingleItemFromCart(product.id);
    router.refresh();
  }

  return (
    <div className="flex justify-between bg-white rounded-xl shadow-md p-4">
      <div className="flex-shrink-0 relative h-24 w-24">
        <Image width={100} height={100} src={product.image} alt={product.name} className="rounded-lg shadow-sm" />
      </div>
      <div className="ml-4 flex-grow mt-4">
        <Link href={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-semibold text-lg text-gray-800">
            {product.name} - <small className="text-sm text-gray-500">${product.price.toFixed(2)}</small>
          </h3>
        </Link>
        <div className="flex flex-col items-start mt-3">
          <span className="text-gray-700">Cantidad: {quantity}</span>
          <span className="font-bold text-gray-800 mt-1">Total: ${(product.price * quantity).toFixed(2)}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2 pr-4">
        <button
          onClick={onAddToCart}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 rounded-lg text-sm px-4 py-2 transition-shadow shadow-sm focus:outline-none focus:ring-2"
        >
          <IoAddCircleOutline size={24} />
        </button>
        <span className="text-md text-gray-900">{quantity}</span>
        <button
          onClick={onRemoveItem}
          className="text-white bg-red-500 hover:bg-red-600 focus:ring-red-300 rounded-lg text-sm px-4 py-2 transition-shadow shadow-sm focus:outline-none focus:ring-2"
        >
          <IoRemove size={24} />
        </button>
      </div>
    </div>
  );
};
