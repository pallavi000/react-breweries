import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      sx={{
        py: 3,
        paddingBottom: 1,
        mt: "auto",
      }}
    >
      <Container maxWidth="xl" sx={{ px: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Logo</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <FacebookIcon color="info" />
            </IconButton>
            <IconButton>
              <InstagramIcon color="info" />
            </IconButton>
            <IconButton>
              <TwitterIcon color="info" />
            </IconButton>
            <IconButton>
              <LinkedInIcon color="info" />
            </IconButton>
          </Box>
        </Box>
      </Container>
      <Divider sx={{ margin: "1rem 0rem" }} />
      <Typography variant="body2" sx={{ margin: "auto", textAlign: "center" }}>
        Copyright © Website Name {new Date().getFullYear()}
      </Typography>
    </AppBar>
  );
}

export default Footer;
