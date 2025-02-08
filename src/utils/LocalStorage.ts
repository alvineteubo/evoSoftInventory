import { Inventory as Inventory } from "../types/Inventory";

const INVENTORY_KEY = "inventory_data";

export const saveInventory = (inventory: Inventory[]) => {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
};

export const loadInventory = (): Inventory[] => {
  const data = localStorage.getItem(INVENTORY_KEY);
  return data ? JSON.parse(data) : [];
};

//export csv
export const exportToCsv = (inventory: Inventory[]): void => {
  if (inventory.length === 0) return;

  const headers = ["Date", "Produit ID", "Magasin ID", "Stock"];
  const rows = inventory.flatMap((entry) =>
    Object.entries(entry.stock).map(([magasinId, stock]) => [
      entry.date,
      entry.produitId,
      magasinId,
      stock,
    ])
  );

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `inventory_export_${new Date().toISOString()}.csv`;
  link.click();
};
