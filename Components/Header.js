import { cursorTo } from "node:readline";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <img
          src="https://t3.ftcdn.net/jpg/02/41/30/72/360_F_241307210_MjjaJC3SJy2zJZ6B7bKGMRsKQbdwRSze.jpg"
          alt="Food Logo"
          style={styles.logo}
        />
        <h2 style={styles.title}>FoodExpress</h2>
      </div>

      <div style={styles.center}>
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchBar}
          disabled
          title="Search not functional yet"
        />
      </div>

      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>Home</Link>
        <Link to="/contact" style={styles.navLink}>Contact</Link>
        <Link to="/Footer" style={styles.navLink}>AboutUS</Link>
        <Link to="/" style={styles.navLink}>FAQs</Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "red",
    color: "#fff",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 100,
    justifyContent: "space-between",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: "0 0 auto",
    cursoe:"pointer",
  },
  logo: {
    height: "40px",
    width: "40px",
    borderRadius: "50%",
  },
  title: {
    margin: 0,
  },
  center: {
    flex: "1 1 auto",
    display: "flex",
    justifyContent: "center",
  },
  searchBar: {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "none",
    width: "300px",
    maxWidth: "100%",
    cursor:"text",
  },
  nav: {
    flex: "0 0 auto",
    display: "flex",
    gap: "20px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Header;
