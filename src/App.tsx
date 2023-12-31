import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import CompanyDetail from "./pages/CompanyDetail";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import About from "./pages/About";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#252B48", // Your primary color
    },
    secondary: {
      main: "#445069", // Your secondary color
    },
    info: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "Rubik",
  },
});

const App = () => {
  return (
    <Router>
      <GoogleOAuthProvider clientId="636134274529-2qocgmf3ug0qn5pdt3buo4ucd3vlej8v.apps.googleusercontent.com">
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/react-breweries" element={<Home />} />
            <Route
              path="/react-breweries/company/:id"
              element={<CompanyDetail />}
            />
            <Route path="/react-breweries/contact" element={<Contact />} />
            <Route path="/react-breweries/about" element={<About />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Router>
  );
};

export default App;
