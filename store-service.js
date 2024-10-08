
const fs = require('fs');
const path = require('path');

let items = [];
let categories = [];

const dataPath = path.join(__dirname, 'data');

// Function to initialize and read items.json and categories.json
function initialize() {
    return new Promise((resolve, reject) => {
        // Read items.json
        fs.readFile(path.join(dataPath, 'items.json'), 'utf8', (err, data) => {
            if (err) {
                reject("unable to read items.json file");
                return;
            }
            try {
                items = JSON.parse(data);
            } catch (parseErr) {
                reject("Error parsing items.json");
                return;
            }
            
            // Read categories.json after reading items.json successfully
            fs.readFile(path.join(dataPath, 'categories.json'), 'utf8', (err, data) => {
                if (err) {
                    reject("unable to read categories.json file");
                    return;
                }
                try {
                    categories = JSON.parse(data);
                    resolve("Data successfully loaded");
                } catch (parseErr) {
                    reject("Error parsing categories.json");
                }
            });
        });
    });
}

// Function to get all items
function getAllItems() {
    return new Promise((resolve, reject) => {
        if (items.length === 0) {
            reject("no results returned");
        } else {
            resolve(items);
        }
    });
}

// Function to get all published items
function getPublishedItems() {
    return new Promise((resolve, reject) => {
        const publishedItems = items.filter(item => item.published === true);
        if (publishedItems.length === 0) {
            reject("no results returned");
        } else {
            resolve(publishedItems);
        }
    });
}

// Function to get all categories
function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject("no results returned");
        } else {
            resolve(categories);
        }
    });
}

module.exports = {
    initialize,
    getAllItems,
    getPublishedItems,
    getCategories
};
