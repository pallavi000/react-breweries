import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

import { TCompany } from "../@types/company";

function Company({ company }: { company: TCompany }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          display: "flex",
          paddingRight: "1rem",
          paddingTop: "1rem",
          minWidth: 275,
          minHeight: 225,
        }}
      >
        {company ? (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {company.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {company.address_1}, {company.city}, {company.country}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Link to={`/company/${company.id}`} color="">
                  <Button size="small">View Company</Button>
                </Link>
              </Box>
            </Box>
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: 96,
                width: "100%",
              }}
            >
              <QRCode
                size={256}
                style={{
                  height: "auto",
                  maxWidth: "100%",
                  width: "100%",
                }}
                value={company.website_url || ""}
                viewBox={`0 0 256 256`}
              />
            </div>
          </>
        ) : null}
      </Card>
    </Grid>
  );
}

export default Company;
