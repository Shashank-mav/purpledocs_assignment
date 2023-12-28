import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  // handle book deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      // Reload the page after successful deletion
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // structure for displaying books in a table
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Book Shop</h1>

      {books.length === 0 ? (
        <p style={emptyStoreStyle}>Store is empty. Please add books.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Price</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the books array to display each book */}
            {books.map((book) => (
              <tr key={book.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{book.title}</td>
                <td style={tableCellStyle}>{book.desc}</td>
                <td style={tableCellStyle}>${book.price}</td>
                <td style={tableCellStyle}>
                  <button style={deleteButtonStyle} onClick={() => handleDelete(book.id)}>
                    Delete
                  </button>
                  <button style={updateButtonStyle}>
                    <Link to={`/update/${book.id}`} style={updateLinkStyle}>
                      Update
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button style={addButtonStyle}>
        <Link to="/add" style={addLinkStyle}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

// Styles for the component
const containerStyle = {
  maxWidth: "800px",
  margin: "auto",
  padding: "20px",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "24px",
  color: "#333",
};

const emptyStoreStyle = {
  textAlign: "center",
  fontSize: "18px",
  color: "#777",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const tableHeaderStyle = {
  padding: "15px",
  textAlign: "left",
  backgroundColor: "#007bff",
  color: "#fff",
};

const tableRowStyle = {
  borderBottom: "1px solid #ccc",
};

const tableCellStyle = {
  padding: "15px",
};

const deleteButtonStyle = {
  backgroundColor: "#dc3545",
  color: "#fff",
  padding: "8px 12px",
  marginRight: "8px",
  border: "none",
  cursor: "pointer",
};

const updateButtonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "8px 12px",
  border: "none",
  cursor: "pointer",
};

const updateLinkStyle = {
  color: "inherit",
  textDecoration: "none",
};

const addButtonStyle = {
  backgroundColor: "#28a745",
  color: "#fff",
  padding: "10px 15px",
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  marginTop: "10px",
};

const addLinkStyle = {
  color: "inherit",
  textDecoration: "none",
};

export default Books;
