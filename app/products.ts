export interface Product {
  id: string;
  slug: string;
  name: string;
  cost: number;
}

const products: Product[] = [
  {
    id: "1",
    slug: "bacon",
    name: "Bacon (0.5 lbs)",
    cost: 5,
  },
  {
    id: "2",
    slug: "pork-chops",
    name: "Pork Chops (1 lb)",
    cost: 7.5,
  },
  {
    id: "3",
    slug: "ham",
    name: "Ham (1 lb)",
    cost: 8,
  },
];

export default products;
