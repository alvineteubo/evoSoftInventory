import { Inventaire } from '../types/Inventory';

const INVENTORY_KEY = 'inventory_data';

export const saveInventory = (inventory: Inventaire[]) => {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
};

export const loadInventory = (): Inventaire[] => {
  const data = localStorage.getItem(INVENTORY_KEY);
  return data ? JSON.parse(data) : [];
};


// Fonction d'exportation en CSV
export const exportToCsv = (inventory: Inventaire[]): void => {
  if (inventory.length === 0) return; // Si l'inventaire est vide, on arrête l'exportation

  const headers = ['Date', 'Produit ID', 'Magasin ID', 'Stock'];
  const rows = inventory.flatMap(entry => 
    Object.entries(entry.stock).map(([magasinId, stock]) => [
      entry.date,
      entry.produitId,
      magasinId,
      stock
    ])
  );
  
  const csvContent = [
    headers.join(','),  // Ajout des entêtes une seule fois
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `inventory_export_${new Date().toISOString()}.csv`;
  link.click();
};