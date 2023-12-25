// 'use client';

import { getCookie, hasCookie, setCookie } from 'cookies-next';

// Forma de la cookie
/*
  cookie: cart
  {
    'uui-123-1': 1,
    'uui-123-2': 3
    'uui-123-3': 4,
  }
*/

export const getCookieCart = (): { [key: string]: number } => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse((getCookie('cart') as string) ?? '{}');
    return cookieCart;
  }

  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie('cart', JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  delete cookieCart[id];
  setCookie('cart', JSON.stringify(cookieCart));
};

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    if (cookieCart[id] > 1) {
      cookieCart[id] -= 1;
    } else {
      delete cookieCart[id];
    }
  }
  setCookie('cart', JSON.stringify(cookieCart));
};
