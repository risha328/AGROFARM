const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const paymentRoutes = require('./routes/payment');
const chatRoute = require("./routes/chat");
const machineryRoutes = require("./routes/machineryRoutes");

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser())

app.use("/api",router)
app.use('/api', paymentRoutes);
app.use("/api/chat", chatRoute);
app.use("/api/machineries", machineryRoutes);

const PORT = 8080 || process.env.PORT

const apiKey = process.env.OPENROUTER_API_KEY;
connectDB().then(()=>{
    app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT || 8080}`);
});
})

console.log("JWT Secret:", process.env.TOKEN_SECRET_KEY); 
