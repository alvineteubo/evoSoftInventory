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
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { Inventory } from "../types/Inventory";
import { magasins, produits } from "../Data";
import {
  exportToCsv,
  loadInventory,
  saveInventory,
} from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import "../components/InventoryList.css";

export const InventoryList: React.FC = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [selectedItem, setSelectedItem] = useState<Inventory | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState<number | string>("");

  useEffect(() => {
    const savedInventory = loadInventory();
    setInventory(savedInventory);
  }, []);

  const handleDelete = () => {
    if (selectedItem) {
      const newInventory = inventory
        .map((entry) => {
          if (
            entry.date === selectedItem.date &&
            entry.produitId === selectedItem.produitId
          ) {
            const newStock = { ...entry.stock };
            delete newStock[selectedItem.magasinId];
            return Object.keys(newStock).length > 0
              ? { ...entry, stock: newStock }
              : null;
          }
          return entry;
        })
        .filter(Boolean) as Inventory[];

      setInventory(newInventory);
      saveInventory(newInventory);
      setOpenDialog(false);
      setSelectedItem(null);
    }
  };

  const handleEdit = () => {
    if (selectedItem && editedQuantity !== "") {
      const newInventory = inventory.map((entry) => {
        if (
          entry.date === selectedItem.date &&
          entry.produitId === selectedItem.produitId
        ) {
          const newStock = {
            ...entry.stock,
            [selectedItem.magasinId]: +editedQuantity,
          };
          return { ...entry, stock: newStock };
        }
        return entry;
      });

      setInventory(newInventory);
      saveInventory(newInventory);
      setOpenEditDialog(false);
      setSelectedItem(null);
    }
  };

  return (
    <div className="inventoryListContainer">
      <Box
        display="flex"
        justifyContent="space-between"
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
        <Table sx={{ minWidth: 900 }} aria-label="inventory table">
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
                      onClick={() => {
                        setSelectedItem({ ...entry, magasinId });
                        setEditedQuantity(stock);
                        setOpenEditDialog(true);
                      }}
                    >
                      Éditer
                    </Button>
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setSelectedItem({ ...entry, magasinId });
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

      {/* Confirmation Dialog for Delete */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cet inventaire ?
          </DialogContentText>
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

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Modifier l'inventaire</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez modifier la quantité de ce produit.
          </DialogContentText>
          <TextField
            label="Quantité"
            type="number"
            fullWidth
            value={editedQuantity}
            onChange={(e) => setEditedQuantity(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleEdit} color="secondary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
