import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import {
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Box,
  TextField,

} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Store, Inventory } from "../types/Inventory";
import { magasins, produits } from "../Data";
import { saveInventory, loadInventory } from "../utils/LocalStorage";
import "../components/InventoryForm.css";

export const InventoryForm: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [produitId, setProduitId] = useState("");
  const [stocks, setStocks] = useState<Record<string, number>>(
    magasins.reduce((acc, magasin) => ({ ...acc, [magasin.id]: 0 }), {})
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [inventory, setInventory] = useState<Inventory[]>([]);

  useEffect(() => {
    const savedInventory = loadInventory();
    setInventory(savedInventory);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!date) newErrors.date = "Ce champ est requis";
    if (!produitId) newErrors.produitId = "Ce champ est requis";

    Object.entries(stocks).forEach(([magasinId, stock]) => {
      if (stock < 0) {
        newErrors[`stock_${magasinId}`] = "La quantité doit être positive";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveInventory = () => {
    if (!validateForm()) return;

    const newEntry: Inventory = {
      date: date?.toISOString() || "",
      produitId,
      stock: stocks,
    };

    const newInventory = [...inventory, newEntry];
    setInventory(newInventory);
    saveInventory(newInventory);

    setProduitId("");
    setStocks(
      magasins.reduce((acc, magasin) => ({ ...acc, [magasin.id]: 0 }), {})
    );
  };

  return (
    <div className="InventoryForm-container">
      <Typography className="titlepage" fontWeight={900} fontSize={30}>
        {" "}
        Gestion des inventaires
      </Typography>
      <Box display="flex" alignItems="center" gap={1} marginBottom={3}>
        <AddCircleIcon sx={{ color: "blue" }} />
        <Typography fontWeight={500} fontSize={15} color="black">
          Nouveau inventaire
        </Typography>
      </Box>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveInventory();
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={6} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Sélectionner une date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.date,
                    helperText: errors.date,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.produitId}>
              <InputLabel>Produit</InputLabel>
              <Select
                value={produitId}
                onChange={(e) => setProduitId(e.target.value as string)}
                label="Produit"
              >
                <MenuItem value="">Sélectionner un produit</MenuItem>
                {produits.map((produit) => (
                  <MenuItem key={produit.id} value={produit.id}>
                    {produit.nom} ({produit.prix}€)
                  </MenuItem>
                ))}
              </Select>
              {errors.produitId && (
                <Typography variant="caption" color="error">
                  {errors.produitId}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {magasins.map((magasin) => (
            <Grid item xs={12} sm={6} key={magasin.id}>
              <TextField
                label={`Stock pour ${magasin.nom}`}
                type="number"
                value={stocks[magasin.id]}
                onChange={(e) =>
                  setStocks((prevStocks) => ({
                    ...prevStocks,
                    [magasin.id]: parseInt(e.target.value),
                  }))
                }
                fullWidth
                error={!!errors[`stock_${magasin.id}`]}
                helperText={errors[`stock_${magasin.id}`]}
              />
            </Grid>
          ))}
        </Grid>
        <div className="button">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Enregistrer
          </Button>

          
        </div>
      </form>
    </div>
  );
};
