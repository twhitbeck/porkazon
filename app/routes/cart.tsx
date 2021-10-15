import { LoaderFunction, useRouteData } from "remix";

import { getSession } from "../sessions";

import products from "../products";

import type { Cart } from "../types";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  return (
    session.get("cart") || {
      entries: [],
    }
  );
};

export default function Cart() {
  const cart = useRouteData<Cart>();

  return (
    <div>
      <p>Your cart</p>

      {cart.entries.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.entries.map(({ id, count }) => {
            const product = products.find((product) => product.id === id)!;

            return (
              <li key={id}>
                {product.name} ({count})
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
