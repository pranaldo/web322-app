/*********************************************************************************

WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.

Name: Prasanna Lamichhane
Student ID: 120887237
Date: 2024-10-07
Cyclic Web App URL: _______________________________________________________
GitHub Repository URL: ______________________________________________________

********************************************************************************/ 

const express = require('express');
const path = require('path');
const storeService = require('./store-service'); // Requiring the custom store-service module

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/about');
});


app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});


app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
        .then(publishedItems => res.json(publishedItems))
        .catch(err => res.status(500).json({ message: err }));
});

// Route to retrieve all items using store-service
app.get('/items', (req, res) => {
    storeService.getAllItems()
        .then(items => res.json(items))
        .catch(err => res.status(500).json({ message: err }));
});

// Route to retrieve categories using store-service
app.get('/categories', (req, res) => {
    storeService.getCategories()
        .then(categories => res.json(categories))
        .catch(err => res.status(500).json({ message: err }));
});

// Handling non-matching routes (404)
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize the store-service and start the server only after successful initialization
storeService.initialize()
    .then(() => {
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Express http server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to initialize the data:", err);
    });
