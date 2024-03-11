const express = require('express');
const CORS = require('cors');
const walkerjohnson = express();
const context = require('./models');

context.sequelize.sync().then(() => {
    walkerjohnson.listen(2999, () => {
        console.log("Server running on port 2999");
    });
});

walkerjohnson.use(express.json());
walkerjohnson.use(CORS());

walkerjohnson.get("/", async (req, res) => {
    const reviewList = await context.Reviews.findAll();
    console.log("Get request triggered");
    res.json(reviewList);
});

walkerjohnson.get("/WriteReview", (req, res) => {
    console.log("Review get request triggered");
    res.send("Write a review");
});

walkerjohnson.post("/WriteReview", async (req, res) => {
    try {
      // Extract data from the request body
      const { name, rating, review } = req.body;
  
      // Create a new instance of your model with the extracted data
      const newReview = await context.Reviews.create({
        name,
        rating,
        review
      });
  
      res.status(201).location('/').json(newReview);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Server Error' });
    }
  });