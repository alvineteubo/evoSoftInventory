import { Store, Product, Inventory } from "./types/Inventory.ts";

export const magasins: Store[] = [
  { id: "1", nom: "Magasin Central", adresse: "Paris" },
  { id: "2", nom: "Boutique Nord", adresse: "Lille" },
  { id: "3", nom: "Magasin Sud", adresse: "Lyon" },
];

export const produits: Product[] = [
  { id: "1", nom: "Ordinateur Portable", prix: 1000 },
  { id: "2", nom: "Smartphone", prix: 30 },
  { id: "3", nom: "Casque Audio", prix: 20 },
];

export const inventaires: Inventory[] = [
  {
    date: "2025-02-08",
    produitId: "1",
    stock: {
      "1": 50,
      "2": 120,
    },
  },
  {
    date: "2025-02-09",
    produitId: "2",
    stock: {
      "1": 80,
      "2": 200,
    },
  },
];
