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
        description:
            "This high-performance laptop is designed to meet all your computing needs. Featuring a powerful processor, ample RAM, and a fast SSD, it ensures smooth multitasking and quick boot times. The sleek design makes it a perfect companion for both work and play, whether you're in the office, at home, or on the go. With a vibrant display and long battery life, you can enjoy streaming, gaming, and working without interruptions.",

        imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
        additionalImages: [
            "https://images.pexels.com/photos/69432/pexels-photo-69432.jpeg",
            "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg",
            "https://images.pexels.com/photos/459654/pexels-photo-459654.jpeg",
        ],
    },
    {
        id: 2,
        name: "Smartphone",
        category: "Electronics",
        quantity: 25,
        price: 799.99,
        description:
            "This latest smartphone model features a stunning display, powerful processor, and an advanced camera system. With its sleek design and high-performance capabilities, this phone is perfect for both productivity and entertainment. Enjoy lightning-fast speeds, a vibrant screen, and a long-lasting battery that keeps up with your busy lifestyle.",
        imageUrl:
            "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        additionalImages: [
            "https://images.pexels.com/photos/249324/pexels-photo-249324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/238541/pexels-photo-238541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        ],
    },

    {
        id: 3,
        name: "Office Chair",
        category: "Furniture",
        quantity: 20,
        price: 199.99,
        description:
            "This  office chair is designed to provide maximum comfort during long working hours. It features adjustable height, lumbar support, and a reclining backrest, allowing you to find the perfect sitting position. The chair is upholstered in high-quality, breathable fabric, which helps to keep you cool even during intense work sessions. With its sturdy base and smooth-rolling casters, this chair is both durable and easy to maneuver.",
        imageUrl:
            "https://images.pexels.com/photos/7195522/pexels-photo-7195522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        additionalImages: [
            "https://images.pexels.com/photos/8111799/pexels-photo-8111799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        ],
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
