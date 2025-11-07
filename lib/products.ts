export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

// Campaign packages as products
export const PRODUCTS: Product[] = [
  {
    id: "spark",
    name: "Spark",
    description: "1 Song Play",
    priceInCents: 2500, // $25
  },
  {
    id: "blaze",
    name: "Blaze",
    description: "3 Song Plays",
    priceInCents: 6000, // $60
  },
  {
    id: "ignite",
    name: "Ignite",
    description: "5 Song Plays",
    priceInCents: 9000, // $90
  },
]
