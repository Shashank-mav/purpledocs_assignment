# React and SQL CRUD Operation - Book Store
## Introduction
This project is a simple CRUD (Create, Read, Update, Delete) application built using React for the frontend and Node.js with Express for the backend. It demonstrates basic operations on a book store database hosted on FreeMySQLHosting.

## Getting Started
To run this project locally, follow these steps:

- Clone the repository:


```
git clone https://github.com/Shashank-mav/purpledocs_assignment.git

```
Navigate to the project directory:


```
cd purpledocs_assignment
```

Install dependencies for both the frontend and backend:



# Install frontend dependencies
cd client
npm install

# Install backend dependencies

```
cd ../server
npm install
```

Start the frontend and backend servers:



# Start frontend (from the 'client' directory)
npm start

# Start backend (from the 'server' directory)
npm start
The frontend should be accessible at http://localhost:3000 and the backend at http://localhost:8800.

Backend Configuration
The backend is connected to a MySQL database hosted on FreeMySQLHosting. To configure the database connection, modify the index.js file in the server directory.


```
const db = mysql.createPool({
  host: "sql12.freemysqlhosting.net",
  user: "sql12673359",
  password: "8SLwprqAiv",
  database: "sql12673359",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
```
Replace the values for user, password, host, and database with your own database credentials.

## Database Fields
The books table in the database has the following fields:
```
id: Book ID (auto-incremented)
title: Book title
desc: Book description
price: Book price
cover: URL for the book cover image
```


## Endpoints

```
GET /books: Retrieve all books from the database.
POST /books: Add a new book to the database.
DELETE /books/:id: Delete a book from the database by ID.
PUT /books/:id: Update a book in the database by ID.

```
