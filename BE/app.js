const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const productData = [
    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        quantity: 15,
        price: 1299.99,
    },
    {
        id: 2,
        name: "Wireless Mouse",
        category: "Electronics",
        quantity: 50,
        price: 29.99,
    },
    {
        id: 3,
        name: "Keyboard",
        category: "Electronics",
        quantity: 30,
        price: 49.99,
    },
    {
        id: 4,
        name: "Office Chair",
        category: "Furniture",
        quantity: 20,
        price: 199.99,
    },
    {
        id: 5,
        name: "Desk Lamp",
        category: "Furniture",
        quantity: 25,
        price: 39.99,
    },
    {
        id: 6,
        name: "Notebook",
        category: "Stationery",
        quantity: 100,
        price: 5.99,
    },
    {
        id: 7,
        name: "Pen",
        category: "Stationery",
        quantity: 200,
        price: 1.99,
    },
    {
        id: 8,
        name: "Monitor",
        category: "Electronics",
        quantity: 10,
        price: 249.99,
    },
    {
        id: 9,
        name: "Coffee Mug",
        category: "Kitchenware",
        quantity: 60,
        price: 12.99,
    },
    {
        id: 10,
        name: "Headphones",
        category: "Electronics",
        quantity: 25,
        price: 99.99,
    },
];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json(productData);
});

app.get("/product/:id", (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = productData.find((p) => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.put("/product/:id", (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const updatedProduct = req.body;

    const index = productData.findIndex((p) => p.id === productId);

    if (index !== -1) {
        productData[index] = { ...productData[index], ...updatedProduct };
        res.json(productData[index]);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
