import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Produit } from '../types/Inventory';
import { produits } from '../Data';

const ProduitList: React.FC = () => {
  return (
    <div>
      <Typography variant="h6">Liste des produits</Typography>
      <List>
        {produits.map((produit) => (
          <ListItem key={produit.id}>
            <ListItemText primary={produit.nom} secondary={`Prix : ${produit.prix} €`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ProduitList;