import React from "react";
import Seat from "./Seat";
import "../styles/InputFeild.css";
import {Spinner , Center ,ChakraProvider} from "@chakra-ui/react";


export default function InputFeild({data , postSeatsData , resetSeatsData, loading , error}){

const [input , setInput] = React.useState("");



if(loading){
      return(
            <ChakraProvider>
               <Center mt = "250px">
                    <Spinner thickness='5px'
                             speed='1.5s'
                          //    emptyColor='green.200'
                             color='blue.500'
                             size='xl'/>
            </Center>
            </ChakraProvider>
              
      )
  }
  
  if(error){
      return(
            <ChakraProvider>
                  <h1 
                textAlign = "center" 
                marginTop = "200px"
                color = "red"
            >Something Went Wrong...</h1>
            </ChakraProvider>
           
      )
  }
  
 
    return (
        <div>
            <div className="showSeats">
                  <div className = "redBox"></div>
                  <div>Booked Seats</div>
            </div>
            <div className="showSeats">
                  <div className = "greenBox"></div>
                  <div>Available Seats</div>
            </div>
            <div style = {{"display" : "flex", "marginLeft" : "10px", "marginTop" : "20px","alignItems": "center"}}>
                   <div>Current Reserve Seats : </div>
                    <div style = {{"display" : "flex" , "gap" : "10px"}}>
                          {
                             data?.map((obj) => {
                               return (<Seat key = {obj.id} data = {obj}/>)
                             })
                          }
                    </div>
            </div>
            <div style = {{"marginLeft" : "10px" , "marginTop":"10px"}}>Number Of Seats</div>
            <div style = {{"marginLeft" : "10px" , "marginTop":"5px"}}>Ex : 4</div>
            <div className = "inputBox">
                      <div>
                            <input onChange = {(e) => setInput(e.target.value)} type = "number" id = "input" style = {{"width" : "98%","height" : "25px","borderRadius" : "5px"}}></input>
                      </div>
                      <div onClick = {() => postSeatsData(Number(input))}>Reserve Seats</div>
            </div>
            <div className="ResetActionDiv" onClick = {resetSeatsData}>Reset All Seats</div>
        </div>
      );
}