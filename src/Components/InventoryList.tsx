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
} from "@mui/material";
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

  useEffect(() => {
    const savedInventory = loadInventory();
    setInventory(savedInventory);
  }, []);

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
          sx={{ minWidth: 1000, minHeight: 300 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Produit</TableCell>
              <TableCell>Magasin</TableCell>
              <TableCell>Quantité</TableCell>
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
