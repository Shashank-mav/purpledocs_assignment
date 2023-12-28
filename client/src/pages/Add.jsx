import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // Handle input changes in the form
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to add a new book to the server
      await axios.post("http://localhost:8800/books", book);
      // Navigate to the home page after successful addition
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  // structure for the add book form
  return (
    <div style={styles.formContainer}>
      <h1 style={styles.formHeading}>Add New Book</h1>
      <input
        style={styles.formInput}
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        style={styles.formInput}
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        style={styles.formInput}
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
      />
      <input
        style={styles.formInput}
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      />
      <button style={styles.formButton} onClick={handleClick}>
        Add
      </button>
      {error && <p style={styles.formError}>Something went wrong!</p>}
      <Link to="/" style={styles.formLink}>
        See all books
      </Link>
    </div>
  );
};

// Styles for the component
const styles = {
  formContainer: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  formHeading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  formInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
  },
  formButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  formError: {
    color: "red",
    marginTop: "10px",
  },
  formLink: {
    display: "block",
    textAlign: "center",
    marginTop: "10px",
    textDecoration: "none",
    color: "#007bff",
  },
};

export default Add;
