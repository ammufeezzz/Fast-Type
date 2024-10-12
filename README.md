Project:**FastType**
This project is part of WEC GDG Rec's 2024.
Stack Used:HTML,CSS,JS,NODE,POSTGRES,EXPRESS.

**How to Get started**
- Node.js 
- PostgreSQL

### Clone the Repository
git clone https://github.com/yourusername/Fast-Type.git
cd Fast-Type<br>

1)**Install dependencies**:
npm i<br>
2)**Set Up the Database**:
*Create a new PostgreSQL database.
*Update your database connection settings in the backend JavaScript file (make sure to provide the necessary credentials).
*Create the required tables in your database. You can use the following SQL command as a reference:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) 
);

CREATE TABLE wpmrecords (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    wpm INTEGER NOT NULL
);<br>

3)**Start the Application**
node/nodemon server.js




