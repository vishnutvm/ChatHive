import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import mongoDB from './config/db.js';

// Config
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

//dotenv config
dotenv.config();

//Creating API for user
// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

// starting db, starting server
try {
  mongoDB().then(() => {
    server.listen(
      PORT,
      console.log(
        `App is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      )
    );
  });
} catch (err) {
  console.log(err);
}
