require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for frontend requests

const apiKey = process.env.SPOONACULAR_API_KEY;
const baseUrl = "https://api.spoonacular.com/recipes/findByIngredients";

// API endpoint to send recipe data
app.get('/recipes', async (req, res) => {
    const ingredients = req.query.ingredients; // Get ingredients from the query parameter

    if (!ingredients) {
        return res.status(400).json({ error: "Ingredients are required" });
    }

    try {
        const response = await axios.get(baseUrl, {
            params: {
                ingredients,
                number: 5,
                apiKey: apiKey
            }
        });

        res.json(response.data); // Send JSON data to the client
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes", details: error.response.data });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
