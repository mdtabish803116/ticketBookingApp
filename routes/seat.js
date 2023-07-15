const express = require('express');
const {createSeats,fetchAllSeats, bookSeats, resetAllSeats } = require('../handlers/seat');
const seatRouter = express.Router();

seatRouter.post("/createSeats" ,createSeats)
seatRouter.get("/seats/all" , fetchAllSeats)
seatRouter.post("/seats" ,bookSeats)
seatRouter.get("/reset/all" ,resetAllSeats)

module.exports = seatRouter