import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
const swiggyUrl =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.67740&lng=83.20360&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

const FetchRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(proxyUrl + swiggyUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        const cards = data?.data?.cards || [];
        const restaurantCards = cards
          .flatMap((card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
          .filter(Boolean);

        setRestaurants(restaurantCards);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!restaurants.length) return <p>No restaurants found.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", padding: "20px" }}>
      {restaurants.map((restaurant, index) => {
        const { name, cloudinaryImageId, cuisines, avgRating, id } = restaurant.info;
        const imageUrl = cloudinaryImageId
          ? `https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryImageId}`
          : "https://via.placeholder.com/200x150?text=No+Image";

        return (
          <div
            key={`${id}-${index}`}
            onClick={() => navigate(`/menu/${id}`)} // ✅ ROUTING INSTEAD OF FUNCTION CALL
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              width: "220px",
              padding: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={imageUrl}
              alt={name}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <h3>{name}</h3>
            <p>{cuisines?.join(", ")}</p>
            <p>⭐ {avgRating}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FetchRestaurants;
