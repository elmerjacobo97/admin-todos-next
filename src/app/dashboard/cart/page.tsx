import { cookies } from 'next/headers';
import { Product, products } from '@/products/data/products';
import { ItemCard } from '@/shopping-cart';
import { WidgetItem } from '@/components';

export const metadata = {
  title: 'Productos en el carrito',
  description: 'Productos en el carrito de compras.',
};

interface ProductsInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [key: string]: number }) => {
  const productsInCart: ProductsInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((product) => product.id === id);

    if (product) {
      productsInCart.push({
        product,
        quantity: cart[id],
      });
    }
  }
  return productsInCart;
};

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}');
  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce((prev, current) => current.product.price * current.quantity + prev, 0);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-10">
      <div className="w-full md:w-8/12">
        <div className="flex flex-col space-y-6">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
      </div>
      {productsInCart.length > 0 && (
        <div className="w-full md:w-4/12 bg-white p-6 rounded-lg">
          <WidgetItem title="Total a pagar">
            <div className="flex flex-col space-y-2">
              <p className="text-center font-black text-2xl text-blue-600">$ {totalToPay.toFixed(2)}</p>
              <div className="flex justify-between space-x-2">
                <p className="text-lg font-bold">IVA 15%:</p>
                <p className="text-lg">$ {(totalToPay * 0.15).toFixed(2)}</p>
              </div>
            </div>
          </WidgetItem>
        </div>
      )}
    </div>
  );
}
