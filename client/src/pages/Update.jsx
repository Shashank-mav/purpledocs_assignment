import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error, setError] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const requiredFields = ["title", "desc", "price", "cover"];
    const missing = requiredFields.filter((field) => !book[field]);

    if (missing.length > 0) {
      setMissingFields(missing);
      return;
    }

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Update the Book</h1>
      <input
        style={inputStyle}
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
        required
      />
      <textarea
        style={inputStyle}
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
        required
      />
      <button style={buttonStyle} onClick={handleClick}>
        Update
      </button>
      {missingFields.length > 0 && (
        <p style={errorMessageStyle}>Please fill in all required fields.</p>
      )}
      {error && <p style={errorMessageStyle}>Something went wrong!</p>}
      <Link to="/" style={linkStyle}>
        See all books
      </Link>
    </div>
  );
};

const containerStyle = {
  maxWidth: "400px",
  margin: "auto",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "24px",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ced4da",
  borderRadius: "4px",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const errorMessageStyle = {
  color: "red",
  marginTop: "10px",
};

const linkStyle = {
  display: "block",
  textAlign: "center",
  marginTop: "10px",
  textDecoration: "none",
  color: "#007bff",
};

export default Update;
