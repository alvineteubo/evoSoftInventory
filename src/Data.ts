import { Magasin, Produit, Inventaire } from "./types/Inventory.ts";

export const magasins: Magasin[] = [
  { id: "1", nom: "Magasin Central", adresse: "Paris" },
  { id: "2", nom: "Boutique Nord", adresse: "Lille" },
  { id: "3", nom: "Magasin Sud", adresse: "Lyon" },
];

export const produits: Produit[] = [
  { id: "1", nom: "Ordinateur Portable", prix: 1000 },
  { id: "2", nom: "Smartphone", prix: 30 },
  { id: "3", nom: "Casque Audio", prix: 20 },
];

export const inventaires: Inventaire[] = [
  {
    date: "2025-02-08",
    produitId: "1",  // Produit "Ordinateur Portable"
    stock: {
      "1": 50, // Magasin Central
      "2": 120, // Boutique Nord
    },
  },
  {
    date: "2025-02-09",
    produitId: "2",  // Produit "Smartphone"
    stock: {
      "1": 80, // Magasin Central
      "2": 200, // Boutique Nord
    },
  },
];

