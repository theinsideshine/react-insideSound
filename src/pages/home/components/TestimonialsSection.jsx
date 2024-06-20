// src/components/TestimonialsSection.jsx
import React from 'react';
import { Grid, Typography, Card, CardContent, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import testimonialsData from './data/testimonialsData';


const TestimonialsSection = () => {
  const theme = useTheme();

  return (
    <div style={{ padding: '40px 20px', backgroundColor: theme.palette.background.paper }}>
      <Typography variant="h4" align="center" gutterBottom>
        Desafiando a los escuchas
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonialsData.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ backgroundColor: theme.palette.background.default, borderRadius: '16px' }}>
              <CardContent>
                <Avatar src={testimonial.avatar} alt={testimonial.name} style={{ width: 60, height: 60, margin: '0 auto 20px' }} />
                <Typography variant="body1" align="center" gutterBottom>
                  {testimonial.review}
                </Typography>
                <Typography variant="subtitle2" align="center">
                  {testimonial.name}
                </Typography>
                <Typography variant="caption" align="center" color="text.secondary">
                  {testimonial.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TestimonialsSection;
