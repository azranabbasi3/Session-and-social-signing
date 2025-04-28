const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const router = require("./routes/routes");
const app = express();
const cors = require("cors");
const session = require('express-session')
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
  secret: 'abc*1234X', 
  resave: false,            
  saveUninitialized: false,  
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    sameSite: 'lax',
    httpOnly: true
  }
}));

connectDB();

app.use("/api", router);


app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
