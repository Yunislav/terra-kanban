import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin-bottom: 8px;
  cursor: pointer;
`;

export default function TodoCard({ name, description }) {
  console.log('description', description);
  return (
    <StyledCard>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="blue" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
