import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Provider } from 'react-redux';

const StyledCard = styled(Card)`
  margin-bottom: 8px;
  cursor: pointer;
`;

export default function TodoCard({ name, description, id, index }) {
  console.log('description', description);
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
        </div>
      )}
    </Draggable>
  );
}
