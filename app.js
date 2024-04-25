const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/products.model");
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("This is the home the server");
});

// reading all the products from the database
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// reading the product by id
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Product post api
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// update product api

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) return res.status(404).json({ message: "Product not found" });
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// delete a product
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

mongoose
  .connect(
    `mongodb+srv://BazBixxxy:Kicka$$500@cluster0.i0wfh3z.mongodb.net/node-api`
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });;
  })
  .catch(() => {
    console.log("Connection failed");
  });
