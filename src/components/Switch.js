import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { toggleStatus } from '../redux/BoardState';

function ControlledSwitches({ listID, id, open, dispatch }) {
  const [checked, setChecked] = useState(open);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    dispatch(toggleStatus(listID, id, event.target.checked));
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>Closed</Typography>
      <Switch onChange={handleChange} checked={checked} />
      <Typography>Open</Typography>
    </Stack>
  );
}

export default connect()(ControlledSwitches);
