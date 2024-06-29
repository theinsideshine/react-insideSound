import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import userFriendlyData from './data/userFriendlyData';


const UserFriendlySection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Amigo perro
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Intuicion al andar
        </Typography>
        <Grid container spacing={4}>
          {userFriendlyData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Typography variant="h6" align="center" color="textPrimary">
                {item.title}
              </Typography>
              <Typography align="center" color="textSecondary">
                {item.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default UserFriendlySection;
