import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function EditableField({ title }) {
  const [name, setName] = React.useState(title);
  const [isNameFocused, setIsNamedFocused] = React.useState(false);
  return (
    <div className="App">
      {!isNameFocused ? (
        <Typography
          variant="h6"
          style={{ fontSize: '1rem', paddingBottom: '5px' }}
          onClick={() => {
            setIsNamedFocused(true);
          }}
        >
          {name}
        </Typography>
      ) : (
        <TextField
          autoFocus
          inputProps={{ fontSize: '1rem' }}
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => setIsNamedFocused(false)}
        />
      )}
    </div>
  );
}
