import axios from 'axios';
import { Magasin, Produit, Inventaire } from '../types/Inventory';

const API_URL = 'http://localhost:3001';

export const api = {
  // Magasins
  getMagasins: async (): Promise<Magasin[]> => {
    const response = await axios.get(`${API_URL}/magasins`);
    return response.data;
  },

  // Produits
  getProduits: async (): Promise<Produit[]> => {
    const response = await axios.get(`${API_URL}/produits`);
    return response.data;
  },

  // Inventaires
  getInventaires: async (): Promise<Inventaire[]> => {
    const response = await axios.get(`${API_URL}/inventaires`);
    return response.data;
  },

  addInventaire: async (inventaire: Inventaire): Promise<Inventaire> => {
    const response = await axios.post(`${API_URL}/inventaires`, inventaire);
    return response.data;
  }
};