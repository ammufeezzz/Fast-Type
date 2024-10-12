
This project is part of WEC GDG Rec's 2024.<br>

**YT LINK:**
- https://youtu.be/UO4bD8eRme8?si=H1NqGyQQ6Xoh0JGF <br>

Stack Used:EJS,CSS,JS,NODE,POSTGRES,EXPRESS. <br>


**How to Get started**
- Node.js 
- PostgreSQL

### Clone the Repository
git clone https://github.com/yourusername/Fast-Type.git<br>

cd Fast-Type<br>

1)**Install dependencies**:

npm i<br>

2)**Set Up the Database**:
- Create a new PostgreSQL database.<br>
- Update your database connection settings in the backend JavaScript file (make sure to provide the necessary credentials).<br>
- Create the required tables in your database. You can use the following SQL command as a reference:

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

3)**Start the Application**:<br>
node/nodemon server.js

**Login Page**<br>

![image](https://github.com/user-attachments/assets/5f564fdc-5732-4794-bab8-b9b3f8f917ac)

**Typing Test**<br>

![image](https://github.com/user-attachments/assets/627ecf23-ee42-4e01-98f8-808dc67cdfd2)

**To view user anlytics**<br>

Click on the username, this will direct to the analytics page.
![image](https://github.com/user-attachments/assets/d77fa70d-5d00-48be-8f1c-fea99c99939c)

P.S.: I haven't implemented the leaderboard yet, but I have a plan for it and will definitely tackle it in the future. I'm also looking forward to learning Socket.IO! Thank you for the opportunity; without this experience, I might have delayed learning about databases and authorization. It has been a valuable learning journey.





