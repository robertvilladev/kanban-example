import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";

function Header() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Kanban Example
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
