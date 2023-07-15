const Seat = require("../database/seat.js");

async function createSeats(numberOfSeats) {
    console.log(numberOfSeats, "numberOfSeats")
    try {
      const numberOfRows=Math.ceil(numberOfSeats/7)

        for (let seatNumber = 1; seatNumber <= numberOfSeats; seatNumber++) {
          const newSeat = new Seat({seatNumber,row:Math.ceil(seatNumber/7) , booked : false});
          await newSeat.save();
        }
    } catch (error) {
      throw new Error('Failed to create Seats');
    }
  }

async function getAllSeats(){
    
    try {
       const seats=await Seat.find(); 
       console.log("seats" , seats)
       return seats;
    } catch (error) {
        throw new Error('Failed to find seats');
    }
}

async function bookSeats(seats){
    try {
        console.log("seats" , seats);
        if(seats<1){
            throw new Error('minimum 1 seat required');
        }
        else if(seats>7){
            throw new Error("user can book max 7 seats at time")
        }

        const availableSeats=await Seat.find({booked:false});
        if(availableSeats.length<seats){
            throw new Error(`only ${availableSeats.length} seats are vailable`)
        }

        let availableInOneRow=[];

        for(let i=1;  i<availableSeats.length; i++){

            if(availableInOneRow.length==seats){
                break;
            }
           
            if(availableSeats[i-1].row === availableSeats[i].row){
                availableInOneRow.push(availableSeats[i-1])
                if(availableInOneRow.length===seats-1){
                    availableInOneRow.push(availableSeats[i])
                    break;
                }
            }
            else{
                availableInOneRow=[]
            }

        }
        console.log("availableInOneRow" , availableInOneRow);
      
        if(availableInOneRow.length===seats){
            for(let i=0; i<availableInOneRow.length; i++){
                availableInOneRow[i].booked=true;
                await availableInOneRow[i].save()
                
            }
            return availableInOneRow;
        }
        else{
            let nearestSeats=[];
            
            var minDistance=Infinity
            var distance = Infinity
            var startIndex=0;
            var endIndex=seats;
           
            for(let i=0; i<=availableSeats.length-seats; i++){
                
                distance=availableSeats[seats+i-1].seatNumber-availableSeats[i].seatNumber;
                if(distance<minDistance){
                    minDistance=distance
                    startIndex=i;
                    endIndex=seats+i;
                }

            }
            for(let i=startIndex; i<endIndex; i++){
                nearestSeats.push(availableSeats[i])
            }
            
            for(let i=0; i<nearestSeats.length; i++){
                nearestSeats[i].booked=true;
                await nearestSeats[i].save();
            }

            console.log("nearestSeats" , nearestSeats)
            return nearestSeats;

        }
        
    } catch (error) {
        console.log("error", error.message)
        throw new Error(error.message);
    }
}

async function restAllBooking(){
    try {

        const seats=await Seat.find();
        for(let seat of seats){
            seat.booked=false;
            await seat.save()
        }

        
    } catch (error) {
        throw new Error('Failed to rest booking');
    }
}

module.exports={createSeats,getAllSeats,bookSeats,restAllBooking}