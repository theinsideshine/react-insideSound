// src/components/VintageVibesSection.jsx
import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import vintageVibesData from './data/vintageVibesData';



const VintageVibesSection = () => {
  const theme = useTheme();

  return (
    <div style={{ padding: '40px 20px', backgroundColor: theme.palette.background.paper }}>
      <Typography variant="h4" align="center" gutterBottom>
        Vibraciones de Antaño
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Siempre es hoy
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {vintageVibesData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card style={{ backgroundColor: theme.palette.background.default, borderRadius: '16px' }}>
              <CardMedia
              
                component="img"
                alt={card.title}
                height="440"
                image={card.image}
                title={card.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default VintageVibesSection;
