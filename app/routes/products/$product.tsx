import { useRouteData, redirect, LoaderFunction, ActionFunction } from "remix";

import { getSession, commitSession } from "../../sessions";

import products, { Product } from "../../products";

import type { Cart } from "../../types";

export const loader: LoaderFunction = ({ params }) => {
  return products.find((product) => product.slug === params.product);
};

export const action: ActionFunction = async ({ request }) => {
  const [session, body] = await Promise.all([
    getSession(request.headers.get("Cookie")),
    request.text(),
  ]);

  const params = new URLSearchParams(body);
  const id = params.get("id")!;
  const count = parseInt(params.get("count")!, 10);

  const cart: Cart = session.get("cart") || { entries: [] };

  const existingEntryIndex = cart.entries.findIndex((entry) => entry.id === id);

  if (existingEntryIndex > -1) {
    cart.entries.splice(existingEntryIndex, 1, {
      id,
      count: cart.entries[existingEntryIndex].count + count,
    });
  } else {
    cart.entries.push({
      id,
      count,
    });
  }

  session.set("cart", cart);

  return redirect("/cart", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Product() {
  const { id, name, slug } = useRouteData<Product>();

  return (
    <div>
      <h2>{name}</h2>

      <p>You're looking at the details for {name}.</p>
      <form method="post">
        <input type="hidden" name="id" defaultValue={id} />
        <input required type="number" defaultValue="1" name="count" />
        <button type="submit">+</button>
      </form>
    </div>
  );
}
