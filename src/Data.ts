import { Magasin, Produit } from './types/Inventory.ts';

export const magasins: Magasin[] = [
  { id: '1', nom: 'Magasin Central', adresse: 'Paris' },
  { id: '2', nom: 'Boutique Nord', adresse: 'Lille' },
  { id: '3', nom: 'Magasin Sud', adresse: 'Lyon' },
];

export const produits: Produit[] = [
  { id: '1', nom: 'Ordinateur Portable', prix:1000 },
  { id: '2', nom: 'Smartphone', prix: 30 },
  { id: '3', nom: 'Casque Audio', prix: 20},
];