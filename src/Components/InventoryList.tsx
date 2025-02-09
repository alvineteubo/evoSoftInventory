import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { Inventory } from "../types/Inventory";
import { magasins, produits } from "../Data";
import { exportToCsv, loadInventory } from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import "../components/InventoryList.css";

export const InventoryList: React.FC = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [selectedItem, setSelectedItem] = useState<Inventory| null> (null)
  const [openDialog, setOpenDialog]= useState(false);

  useEffect(() => {
    const savedInventory = loadInventory();
    setInventory(savedInventory);
  }, []);

  const handleDelete = () => {
    if (selectedItem) {
      const newInventory = inventory.map((entry) => {
        if (entry.date === selectedItem.date && entry.produitId === selectedItem.produitId) {
          const newStock = { ...entry.stock };
          delete newStock[selectedItem.magasinId]; // Supprimer uniquement le stock du magasin ciblé
  
          // Si après suppression, il ne reste plus de stock pour ce produit à cette date, on l'enlève complètement
          if (Object.keys(newStock).length === 0) {
            return null;
          }
  
          return { ...entry, stock: newStock };
        }
        return entry;
      }).filter(Boolean) as Inventory[]; // Supprime les éléments `null`
  
      setInventory(newInventory);
      saveInventory(newInventory);
      setDeleteDialogOpen(false);
      setselectedItem(null);
    }
  };
  

  return (
    <div className="inventoryListContainer">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        borderBottom="1px solid #e0e0e0"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Inventory2Icon style={{ fontSize: "20px", color: "#1976d2" }} />
          <Typography fontWeight={700} fontSize={20}>
            Liste des Inventaires
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<DownloadForOfflineIcon />}
          onClick={() => exportToCsv(inventory)}
        >
          Exporter CSV
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 900, minHeight: 200 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Produit</TableCell>
              <TableCell>Magasin</TableCell>
              <TableCell>Quantité</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.flatMap((entry) =>
              Object.entries(entry.stock).map(([magasinId, stock]) => (
                <TableRow key={`${entry.date}-${entry.produitId}-${magasinId}`}>
                  <TableCell>
                    {new Date(entry.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {produits.find((p) => p.id === entry.produitId)?.nom ||
                      "Produit Inconnu"}
                  </TableCell>
                  <TableCell>
                    {magasins.find((m) => m.id === magasinId)?.nom ||
                      "Magasin Inconnu"}
                  </TableCell>
                  <TableCell>{stock}</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<EditIcon />}
                      
                      color="primary"
                    >
                      Éditer
                    </Button>
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setSelectedItem(entry);
                        setOpenDialog(true);
                      }}
                      color="secondary"
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Êtes-vous sûr de vouloir supprimer cet inventaire ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Non
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
