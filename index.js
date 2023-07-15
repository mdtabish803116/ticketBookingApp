require('dotenv').config()
const express = require('express')
const cors = require("cors")
const path = require("path")
const connectDataBase = require('./database')
const seatRouter = require('./routes/seat.js')
const app = express()

app.use(cors());
app.use(express.json())
app.use(logger)
app.use(seatRouter)

function logger(req,res,next){
     console.info(new Date() , req.method, req.path)
     next()
}

app.use(express.static(path.join(__dirname ,"./book-ticket-app/build")));
app.get("*" , function(_ , res) {
      res.sendFile(path.join(__dirname , "./book-ticket-app/build/index.html"), function(err){
            res.status(500).send(err)
      })
})

const PORT = process.env.PORT || 3001

connectDataBase().then(() => {
    app.listen(3001 , () => {
        console.log(`Server running at ${PORT}`)
    })
})

