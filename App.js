import React, { useState } from "react";
import Header from "./Components/Header";
import FetchRestaurants from "./Components/restaurant";
import FetchMenu from "./Components/menu";

const App = () => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [selectedRestaurantName, setSelectedRestaurantName] = useState("");

  const handleSelectRestaurant = (id, name) => {
    setSelectedRestaurantId(id);
    setSelectedRestaurantName(name);
  };

  const handleBack = () => {
    setSelectedRestaurantId(null);
    setSelectedRestaurantName("");
  };

  return (
    <>
      <Header />
      <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
        {!selectedRestaurantId ? (
          <FetchRestaurants onSelectRestaurant={handleSelectRestaurant} />
        ) : (
          <>
            <h1>{selectedRestaurantName}</h1>
            <FetchMenu restaurantId={selectedRestaurantId} onBack={handleBack} />
          </>
        )}
      </div>
    </>
  );
};

export default App;
