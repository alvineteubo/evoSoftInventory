export interface Store {
  id: string;
  nom: string;
  adresse: string;
}

export interface Product {
  id: string;
  nom: string;
  prix: number;
}

export interface Inventory {
  date: string;
  produitId: string;
  stock: Record<string, number>;
}
