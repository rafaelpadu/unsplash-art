import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        marginBottom: "2rem",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1rem" }}>
        © 2022 Copyright: Rafael de Pádua
      </p>
    </footer>
  );
};

export default Footer;
