import React from 'react';
import { useState } from 'react';
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
} from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { Inventaire } from '../types/Inventory';
import { magasins, produits } from '../Data';
import { exportToCsv } from '../utils/LocalStorage';

interface InventoryListProps {
  inventory: Inventaire[];
}

export const InventoryList: React.FC<InventoryListProps> = ({ inventory }) => {
  const getProduitName = (produitId: string): string => {
    const produit = produits.find((p) => p.id === produitId);  
    return produit ? produit.nom : 'Produit Inconnu';
  };
  
  const getMagasinName = (magasinId: string): string => {
    const magasin = magasins.find((m) => m.id === magasinId);  
    return magasin ? magasin.nom : 'Magasin Inconnu';
  };
  
    const [isExporting, setIsExporting] = useState(false);
  
    const handleExport = () => {
      if (isExporting) return; // Si déjà en train d'exporter, on arrête l'exécution
      setIsExporting(true);
      exportToCsv(inventory);
      setIsExporting(false);
    };

  return (
    <Paper elevation={3} sx={{ marginTop: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        borderBottom="1px solid #e0e0e0"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Inventory2Icon className="h-5 w-5 text-blue-500" />
          <Typography variant="h6">Liste des Inventaires</Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<DownloadForOfflineIcon />}
          onClick={handleExport}
        >
          Exporter CSV
        </Button>
      </Box>

      <TableContainer>
        <Table>
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
                  <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                  <TableCell>{getProduitName(entry.produitId)}</TableCell>
                  <TableCell>{getMagasinName(magasinId)}</TableCell>
                  <TableCell>{stock}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};