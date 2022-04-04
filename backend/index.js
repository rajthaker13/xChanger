import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stockTickerRoute from './routes/stockTicker.js';
import {connectToServer} from './db/conn.cjs';

const app = express();
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(stockTickerRoute);
app.use(express.urlencoded());


 
app.listen(port, () => {
  // perform a database connection when server starts
  connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});



