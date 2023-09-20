import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { CredentialResponse, useGoogleOneTapLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

import { TCurrentUser, TGoogleCredentialUser } from "../@types/user";

export default function Navbar() {
  const [currentUser, setCurrentUser] = React.useState<TCurrentUser>();

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      loginSuccess(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const loginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      var decoded: TGoogleCredentialUser = jwt_decode(
        credentialResponse?.credential
      );
      if (decoded) {
        setCurrentUser({
          email: decoded?.email,
          given_name: decoded?.given_name,
          family_name: decoded?.family_name,
          picture: decoded?.picture,
          name: decoded?.name,
        });
      }
    }
    toast.success("Login Success!!");
  };
  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        padding: "0.5rem 0rem",
      }}
    >
      <Toolbar sx={{ flexWrap: "wrap", gap: "2rem", fontSize: "18px" }}>
        <Typography variant="h4" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <Link to="/">Logo</Link>
        </Typography>
        <nav style={{ display: "flex", gap: "2rem" }}>
          <Link color="text.primary" to="/">
            Home
          </Link>
          <Link color="text.primary" to="/contact">
            Contact
          </Link>
          <Link to="/about" color="text.danger">
            About
          </Link>
        </nav>

        {currentUser ? (
          <Tooltip title={currentUser.name}>
            <IconButton>
              <Avatar alt={currentUser.name} src={currentUser.picture} />
            </IconButton>
          </Tooltip>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              loginSuccess(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
