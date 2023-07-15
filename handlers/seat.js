const Seat = require("../database/seat.js");
const seatService=require("./serviceSeat.js");

async function createSeats(req,res){
    try {
        await seatService.createSeats(80);

        return res.status(200).send({"message":"Seats Created succesfully"})
        
    } catch (error) {
        return res.status(500).send({ error });
    }
}


async function fetchAllSeats(req,res){
    try {
        const seats=await seatService.getAllSeats();

        return res.status(200).send({"data":seats})
        
    } catch (error) {
        return res.status(500).send({ error });
    }
}

async function bookSeats(req,res){
    try {

        const seats=await seatService.bookSeats(req.body.seats);
        return res.status(200).send({"data":seats})
        
    } catch (error) {
        return res.status(500).send({ error:error.message });
    }
}

async function resetAllSeats(req,res){
    try {

        await seatService.restAllBooking();
        return res.status(200).send({message:"reset all the booking successfully"})
        
    } catch (error) {
        return res.status(500).json({ error });

    }
}

module.exports={
    createSeats,fetchAllSeats,bookSeats,resetAllSeats
}