import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurant from "./components/Restaurant";
import Menu from "./components/Menu"; // We'll create this next

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Restaurant />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = document.getElementById("root");
const rootele = createRoot(root);
rootele.render(<App />);
