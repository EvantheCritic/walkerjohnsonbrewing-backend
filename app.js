const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 2999;
const db = mysql.createConnection({host: 'localhost', user: 'root', password: 'mysql', database: 'walker johnson'});

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