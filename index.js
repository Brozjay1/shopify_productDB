const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongodb = require("mongodb");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 6000;
const DbUrl = process.env.DB_URL
const DbName = process.env.DB_NAME
const DbTable = process.env.DB_TABLE

const client = new mongodb.MongoClient(DbUrl)

// Adding a new product
app.post("/addproduct", async(req, res) => {
    const { name, price, category, description, stock } = req.body;
    
    if(!name || !price || !category || !stock) {
        return res.status(400).send("error: name, price, category");
    }

    const product = {
        name: name.trim(),
        price: parseFloat(price),
        category: category.trim(),
        description: description ? description.trim() : "",
        stock: stock ? parseInt(stock) : 0,
    };

    try {
        const feedback = await client.db(DbName).collection(DbTable).insertOne(product)
        if(feedback.acknowledged){
            res.send("success")
        }
    } catch (error) {
        res.status(500).send("error")
    }
})

// retrieve all products
app.get("/products", async(req, res) => {
    try {
        const feedback = await client.db(DbName).collection(DbTable).find().toArray();
        res.send(feedback);
    } catch (error) {
        res.status(500).send("Error");
    }
})

// retrieving a single product by name 
app.get("/product/:name", async(req, res) => {
    const name = req.params.name.trim();

    try {
        const feedback = await client.db(DbName).collection(DbTable).findOne({ name: name });
        if (feedback) {
            res.send(feedback);
        } else {
            res.status(404).send("error");
        }
    } catch (error) {
        res.status(500).send("error");
    }
});

// updating product's details
app.post("/updateproduct", async(req, res) => {
    const {name, price, category, description, stock } = req.body;
    
    if (!name) {
        return res.status(400).send("error");
    }

    const updateFields = {};
    if (price) updateFields.price = parseFloat(price);
    if (category) updateFields.category = category.trim();
    if (description) updateFields.description = description.trim();
    if (stock) updateFields.stock = parseInt(stock);
    
    try {
        const feedback = await client.db(DbName).collection(DbTable).updateOne(
            { name: name.trim( )},
            { $set: updateFields}
        );

        if (feedback.matchedCount > 0) {
            res.send("successful");
        }
        else {
            res.status(404).send("error");
        }
    }   catch (error) {
        res.status(500).send("Error")
    }
})                                                 

// Deleting a product by name
app.post("/deleteproduct", async(req, res) => {
    const {name} = req.body;

    if (!name) {
    return res.status(400).send("error");
    }

    try {
        const feedback = await client.db(DbName).collection(DbTable).deleteOne({ name: name.trim() })
        if (feedback.deletedCount > 0){
            res.send("successful");
        } else{
            res.status(404).send("error");
        }
    } catch (error) {
        res.status(500).send("Error");
    }
})

// start the server
app.listen(port, async() => {
    try {
        await client.connect();
        console.log("server is running on port ${port}");
    } catch (error) {
        console.error("error")
    }
});