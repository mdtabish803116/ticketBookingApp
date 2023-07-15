import React from "react"
import Seat from "./Seat";
import "../styles/Seats.css";

export default function Seats({data}){
       
    return (
        <div>  
            <div className="gridItem">
             {
             data?.map((obj) => {  
               return (<Seat key = {obj.id} data = {obj}/>)
              })
             }
            </div>

        </div>
      );
}
