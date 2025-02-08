import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import { InventoryForm } from "./components/InventoryForm";
import { InventoryList } from "./components/InventoryList";
import { Inventaire } from "./types/Inventory";
import { saveInventory, loadInventory } from "./utils/LocalStorage"; // Cela semble inutilisé dans ton code, tu peux peut-être l'ignorer
import { magasins, produits, inventaires } from "./Data"; // Importation des données statiques

function App() {
  const [inventory, setInventory] = useState<Inventaire[]>([]); // Initialiser un tableau vide
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);

  // Charger les données à partir de localStorage et les fusionner avec les données statiques
  useEffect(() => {
    const savedInventory = loadInventory(); // Charger les données sauvegardées depuis localStorage
    const combinedInventory = [...inventaires, ...savedInventory]; // Fusionner les inventaires
    setInventory(combinedInventory); // Mettre à jour l'état avec la combinaison des deux
  }, []);

  const handleSaveInventory = (entry: Inventaire) => {
    try {
      const newInventory = [...inventory, entry]; // Ajouter le nouvel inventaire
      setInventory(newInventory); // Mettre à jour l'état avec les nouveaux inventaires
      saveInventory(newInventory); // Sauvegarder les données dans localStorage
      setError(null); // Réinitialiser l'erreur
    } catch (err) {
      setError("Erreur lors de l'enregistrement");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ paddingTop: 4, paddingBottom: 4}}>
      <Typography variant="h4" gutterBottom>
        Gestion d'Inventaire
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <InventoryForm onSave={handleSaveInventory} />
      <InventoryList inventory={inventory} />
    </Container>
  );
}

export default App;
