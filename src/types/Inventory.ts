export interface Magasin {
    id: string;
    nom: string;
    adresse: string;
  }
  
  export interface Produit {
    id: string;
    nom: string;
    prix: number;
  }
  
  export interface Inventaire {
    date: string;
    produitId: string;
    stock: Record<string, number>; 
  }