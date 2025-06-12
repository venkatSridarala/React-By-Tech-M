import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const proxyUrl = "https://thingproxy.freeboard.io/fetch/";

const Menu = () => {
  const { id: restaurantId } = useParams();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) return;

    const menuApiUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.67740&lng=83.20360&restaurantId=${restaurantId}`;

    fetch(proxyUrl + menuApiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setRestaurantName(data?.data?.cards[0]?.card?.card?.info?.name || "");

        const menuCards = data?.data?.cards.find(
          (c) => c.groupedCard
        )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

        const items = menuCards
          ?.flatMap((c) => c.card?.card?.itemCards || [])
          ?.map((i) => i.card.info);

        setMenuItems(items || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [restaurantId]);

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error loading menu: {error}</p>;
  if (!menuItems.length) return <p>No menu items found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#ff5722",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ← Back to restaurants
      </button>
      <h2 style={{ marginBottom: "20px" }}>{restaurantName}Menu's</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {menuItems.map((item, index) => {
          const displayPrice = (item.price || item.defaultPrice || 0) / 100;
          const imageUrl = item.imageId
            ? `https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`
            : "https://via.placeholder.com/200x150?text=No+Image";

          return (
            <div
              key={`${item.name}-${index}`}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                width: "220px",
                padding: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={imageUrl}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              />
              <h3>{item.name}</h3>
              <p>₹{displayPrice || "N/A"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
