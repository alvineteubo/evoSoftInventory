import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import { InventoryForm } from "./components/InventoryForm";
import { InventoryList } from "./components/InventoryList";
import { Inventaire } from "./types/Inventory";
import { api } from "./utils/api";

function App() {
  const [inventory, setInventory] = useState<Inventaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const data = await api.getInventaires();
      setInventory(data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des données");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveInventory = async (entry: Inventaire) => {
    try {
      const savedEntry = await api.addInventaire(entry);
      setInventory([...inventory, savedEntry]);
      setError(null);
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
    <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
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
