const express =require('express');
const dotenv = require('dotenv').config();
const errorHandler =require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');

const app = express();
app.use(express.json());

// connect to database 
connectDb();
const PORT = process.env.PORT || 3000;

app.use("/api/contacts",require("./routes/contactRoutes"));
app.use(errorHandler);
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
