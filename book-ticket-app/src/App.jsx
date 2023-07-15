import React from 'react';
import './App.css';
import InputFeild from './components/InputFeild';
import Seats from './components/Seats';
import {Spinner , Center ,ChakraProvider} from "@chakra-ui/react";

function App() {

  const [seatData , setSeatData] = React.useState([]);
  const [bookedSeats , setBookedSeats] = React.useState([]);
  const [loading , setLoading] = React.useState(false);
  const [error , setError] = React.useState(false);

 const API_BASE_URL = ""

  async function getSeatsData() {
    setLoading(true)
      await fetch(`${API_BASE_URL}/seats/all`, {
      }).then((res) => res.json())
        .then((res) => {
          setSeatData(res.data)
        }).catch((err) => {
          setError(true)
        }) .finally(() => {
          setLoading(false)
     })
   }

   React.useEffect(()=> {
      getSeatsData()
  }, [bookedSeats])

  async function postSeatsData(seats) {

    if(Number(seats) < 1){
         return alert("Plaese Enter valid seat")
    }else if  (Number(seats) > 7) {
         return alert("User can not reserve more than 7 at a time!")
    }
   
    setLoading(true)

   try {
     let data = await fetch(`${API_BASE_URL}/seats`,{
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({"seats":seats})
     })
     let response = await data.json();
      if (response.error) {
         alert(response.error)
      }else {  
          setBookedSeats(response.data)
      }
     setLoading(false)
       
  }catch(error){
      setError(true)
  }
 }

 async function resetSeatsData() {
  setLoading(true)
  await fetch(`${API_BASE_URL}/reset/all`, {
  }).then((res) => res.json())
    .then(() => {
      alert("all seats reset")
      getSeatsData()
      setBookedSeats([])
    }).catch((err) => {
      setError(true)
    }) .finally(() => {
      setLoading(false)
 })
}

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
   <>  
    <h2>Seat Reservation</h2>
    <div className="App">
        <InputFeild data = {bookedSeats} postSeatsData = {postSeatsData} resetSeatsData = {resetSeatsData} loading = {loading} error = {error}/>
        <Seats data = {seatData}/>
    </div>    
  </>
    
  );
}

export default App;
