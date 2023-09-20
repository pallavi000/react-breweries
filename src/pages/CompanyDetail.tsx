import {
  Breadcrumbs,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import GoogleMapReact from "google-map-react";

import { TGoogleMapProps } from "../@types/shared";
import { TCompany } from "../@types/company";

const AnyReactComponent = ({ text }: { text: string }) => <div>{text}</div>;

function CompanyDetail() {
  const [company, setCompany] = useState<TCompany>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [defaultProps, setDefaultProps] = useState<TGoogleMapProps>({
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 11,
  });
  const { id } = useParams();

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries/${id}`
      );
      setCompany(result?.data);
      setIsLoading(false);
      setDefaultProps({
        center: {
          lat: Number(result?.data?.latitude),
          lng: Number(result?.data?.longitude),
        },
        zoom: 15,
      });
    } catch (e) {
      const error = e as AxiosError;
      console.error("Axios error:", error.response?.status, error.message);
    }
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      {company?.name || "Company Detail"}
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ marginTop: "1rem", paddingBottom: "7rem" }}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      {isLoading ? (
        <>
          <Skeleton
            variant="rectangular"
            height={165}
            sx={{ minWidth: 275, margin: "3rem 0rem" }}
          />
          <Skeleton
            variant="rectangular"
            height={165}
            sx={{ minWidth: 275, margin: "3rem 0rem" }}
          />
          <Skeleton
            variant="rectangular"
            height={500}
            sx={{ minWidth: 275, margin: "3rem 0rem" }}
          />
        </>
      ) : company ? (
        <>
          <Card sx={{ minWidth: 275, margin: "3rem 0rem" }}>
            <CardContent>
              <Grid container spacing={4} columns={12}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">Overview</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Grid container spacing={4} columns={12}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="button">Name</Typography>
                      <Typography variant="body2">{company.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="button">Type</Typography>
                      <Typography variant="body2">
                        {company.brewery_type}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="button">Website</Typography>
                      <a href={company.website_url} target="_blank">
                        <Typography variant="body2">
                          {company.website_url}
                        </Typography>
                      </a>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="button">Phone Number</Typography>
                      <Typography variant="body2">{company.phone}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 275, margin: "3rem 0rem" }}>
            <CardContent>
              <Grid container spacing={4} columns={12}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">Address</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Grid container spacing={4} columns={12}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="button">Street</Typography>
                      <Typography variant="body2">{company.street}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="button">City</Typography>
                      <Typography variant="body2">{company.city}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="button">Province</Typography>

                      <Typography variant="body2">
                        {company.state_province}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="button">Country</Typography>
                      <Typography variant="body2">{company.country}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent text={company.name} />
            </GoogleMapReact>
          </div>
        </>
      ) : null}
    </Container>
  );
}

export default CompanyDetail;
