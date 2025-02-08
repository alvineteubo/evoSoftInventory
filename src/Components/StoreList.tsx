import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Magasin } from '../types/Inventory.ts';
import { magasins } from '../Data';

const MagasinList: React.FC = () => {
  return (
    <div>
      <Typography variant="h6">Liste des magasins</Typography>
      <List>
        {magasins.map((magasin) => (
          <ListItem key={magasin.id}>
            <ListItemText primary={magasin.nom} secondary={magasin.adresse} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MagasinList;