// src/pages/home/components/SoundArchitectSection.jsx
import React from 'react';
import { Grid, Typography, Card, CardContent, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import soundArchitectData from './data/soundArchitectData'; // Asegúrate de que la ruta esté correcta

const SoundArchitectSection = () => {
  const theme = useTheme();

  return (
    <div style={{ padding: '40px 20px', backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" align="center" gutterBottom>
        La Orfebreria En Sonido
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
      Mentras afuera los niños nos guían . Llevan al mundo hacia el otro lado.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {soundArchitectData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ backgroundColor: theme.palette.background.paper, borderRadius: '16px' }}>
              <CardContent style={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    marginBottom: '16px' 
                  }}
                >
                  <item.icon style={{ fontSize: 40, color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SoundArchitectSection;
