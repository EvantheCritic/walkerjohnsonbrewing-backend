const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 2999;
const db = mysql.createConnection({host: 'wvulqmhjj9tbtc1w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com', user: 'svw6esv82fagg4xt', password: 'yzoptmq5u4itnspj', database: 'mupvs7oqx8ktfgj3'});

db.connect(err => {
    if (err) throw err;
    else console.log('Connected to MySQL database');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM reviews';
    db.query(sql, (err, reviews) => {
        if (err) {
            res.status(500).json({ error: 'Failed to get reviews' });
        } else {
            res.json(reviews);
        }
    });
});

app.get('/Home', (req, res) => {
    console.log("Home get triggered");
});

app.get('/WriteReview', (req, res) => {
    console.log('Write Review get triggered');
});

function insertIntoTable(data, table) {
    return new Promise((resolve) => {
        const sql = `INSERT INTO ${table} SET ?`;
        db.query(sql, data, (err, result) => {
            if (err) {
                console.log("Failed to post:", err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

app.post("/WriteReview", async (req, res) => {
    try {
        console.log("Write Review post triggered");
        const reviewData = req.body;
        const result = await insertIntoTable(reviewData, 'reviews');
        res.status(200).json({ message: 'Review written successfully', result });
        res.redirect('/Home')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});