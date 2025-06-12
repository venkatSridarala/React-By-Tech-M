import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FetchRestaurants from "./Components/fetch";
import Menu from "./Components/menu";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<FetchRestaurants />} />
        <Route path="/menu/:id" element={<Menu />} />
        {/* You can add a <Route path="/contact" /> here later */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

const root = document.getElementById("root");
const rootele = createRoot(root);
rootele.render(<App />);
