import {
  Grid,
  Container,
  Box,
  IconButton,
  Pagination,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  Skeleton,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

import { TCompany } from "../@types/company";
import useDebounce from "../hooks/useDebounce";
import Company from "../components/Company";
import SearchComponent from "../components/SearchComponent";

function Home() {
  const [companies, setCompanies] = useState<TCompany[]>([]);
  const [input, setInput] = useState<string>("");
  const searchQuery = useDebounce(input);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [limit, setLimit] = useState<number>(20);
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalCompanies, setTotalCompanies] = useState<number>(limit);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (searchQuery) {
      searchCompanies();
    } else {
      fetchAllCompanies();
    }
  }, [searchQuery, pageNo, limit, sort]);

  const searchCompanies = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries/search?query=${searchQuery}`
      );
      setCompanies(result?.data);
      setIsLoading(false);
    } catch (e) {
      const error = e as AxiosError;
      console.error("Axios error:", error.response?.status, error.message);
    }
  };

  const fetchAllCompanies = async () => {
    setIsLoading(true);
    try {
      const [result, meta] = await Promise.all([
        axios.get(
          `https://api.openbrewerydb.org/v1/breweries?page=${pageNo}&sort=name,name:${sort}&per_page=${limit}`
        ),
        axios.get(
          `https://api.openbrewerydb.org/v1/breweries/meta?page=${pageNo}&sort=name,name:${sort}&per_page=${limit}`
        ),
      ]);
      setTotalCompanies(meta?.data?.total);
      setCompanies(result?.data);
      setIsLoading(false);
    } catch (e) {
      const error = e as AxiosError;
      console.error("Axios error:", error.response?.status, error.message);
    }
  };

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    setPageNo(value);
  };

  const handlePageLimit = (e: SelectChangeEvent) => {
    setLimit(Number(e.target.value));
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "3rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          margin: "1rem 0rem",
          marginBottom: "2rem",
          gap: "1rem",
        }}
      >
        <SearchComponent setInput={setInput} />
        <IconButton
          onClick={() => setSort((prev) => (prev === "asc" ? "desc" : "asc"))}
        >
          <SortByAlphaIcon color="inherit" />
        </IconButton>
      </Box>

      <Grid container spacing={4} columns={12}>
        {isLoading
          ? Array.from(new Array(limit)).map((arr) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton variant="rectangular" width={325} height={225} />
                </Grid>
              );
            })
          : companies.map((company) => {
              return <Company company={company} key={company.id} />;
            })}
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          margin: "3rem 0rem",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={limit.toString()}
            onChange={handlePageLimit}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>50</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          count={Math.floor(totalCompanies / limit)}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Container>
  );
}

export default Home;
