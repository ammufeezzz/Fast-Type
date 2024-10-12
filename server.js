import express from "express"
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import env from "dotenv"
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

env.config();


const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
db.connect();

const port = 3000;

app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.render("login.ejs")
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return res.render("index.ejs", { username }); 
            } else {
                return res.send('Incorrect password. Please try again.');
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
            return res.render("index.ejs", { username }); 
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Internal server error. Please try again later.');
    }
});

app.get("/user-analytics",(req,res)=>{
    res.render("analytics.ejs")
})
app.post('/save-wpm', async (req, res) => {
    const { username, wpm } = req.body;


    try {
        const userQuery = 'SELECT id FROM users WHERE username = $1';
        const userResult = await db.query(userQuery, [username]);

        if (userResult.rows.length > 0) {
            const userId = userResult.rows[0].id;

            const insertQuery = 'INSERT INTO wpmrecords (user_id, wpm) VALUES ($1, $2)';
            await db.query(insertQuery, [userId, wpm]);

            res.status(201).json({ message: 'WPM record saved successfully.' });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error saving WPM:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.get('/user-analytics/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const userResult = await db.query('SELECT id FROM users WHERE username = $1', [username]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userId = userResult.rows[0].id;

        const wpmResult = await db.query('SELECT wpm FROM wpmrecords WHERE user_id = $1', [userId]);

        const wpmData = wpmResult.rows.map(record => record.wpm);
        const averageWPM = wpmData.length > 0 ? (wpmData.reduce((acc, val) => acc + val, 0) / wpmData.length).toFixed(2) : 0;

        res.render("analytics.ejs", { username, wpmData, averageWPM });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving WPM records' });
    }
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });