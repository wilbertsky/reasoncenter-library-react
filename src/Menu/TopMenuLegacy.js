import * as React from "react";
import { AppBar, Button, Container, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';
const pages = ['Affiliated Groups', 'Events Calendar', 'About', 'Contact'];

{ /*
    Todo: 1. Update the responsive sm menu icon with links of the menu.
          2. Add a function for redirecting clicks on any of the links.
*/ }

function TopMenuLegacy() {
  const menuLogo = "https://i0.wp.com/reasoncenter.org/wp-content/uploads/2020/10/Reason-Center.png?resize=1024%2C358&ssl=1";

  return  <AppBar position="static" sx={{ backgroundColor: "#000" }}>
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{ justifyContent: "space-evenly"}}>
        <img
          src={`${menuLogo}?w=100&h=100&fit=crop&auto=format`}
          alt="Reason Center Logo"
          loading="lazy"
          onClick={() => (window.location.href = "https://reasoncenter.org")}
        />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => console.log("clicked")}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))}
        </Box>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, display: { md: 'none', lg: 'none', xl: 'none'} }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </Container>
  </AppBar>
}

export default TopMenuLegacy;