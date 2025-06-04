import React from "react";
import { Link } from "react-router-dom";

const Restaurant = () => {
  return (
    <>
      <Link to="/menu">
        <img
          src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"
          alt="Dish"
          style={{ cursor: "pointer", width: "100%", maxWidth: "600px" }}
        />
      </Link>
    </>
  );
};

export default Restaurant;
