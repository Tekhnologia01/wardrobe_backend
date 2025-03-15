require('dotenv').config();

const express = require('express');
// const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('./utils/db');
const router = require('./routers/routers');
const PORT = process.env.PORT || 5001;
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path'); // for image path
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads'))); // for image path

app.get("/", (req,resp)=>{
    resp.json({ message :"Welcome to Wardrobe" })
})

// Use the router
app.use('/', router);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});