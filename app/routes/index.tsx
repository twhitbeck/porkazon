import { Link } from "react-router-dom";

import products, { Product } from "../products";

import { useRouteData, LoaderFunction, MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Porkazon",
    description: "Welcome to Porkazon!",
  };
};

export let loader: LoaderFunction = async () => {
  return { products };
};

export default function Index() {
  const { products } = useRouteData<{ products: Product[] }>();

  return (
    <table className="w-full">
      <caption className="px-4 py-2">Available products</caption>

      <tbody>
        {products.map(({ id, slug, name, cost }) => (
          <tr key={id}>
            <td className="px-4 py-2">
              <Link
                className="text-pink-900 hover:text-pink-800"
                to={`/products/${slug}`}
              >
                {name}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
