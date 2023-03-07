import { useState, useEffect, useRef } from 'react'
import DailyCard from './DailyCard';

function App() {
  const userInput = useRef(0);
  const [count, setCount] = useState(0)
  const [city, setCity] = useState("London")
  const [latLong, setLatLong] = useState([0,0])
  const [maxTemperatures, setMaxTemperatures] = useState([])
  const [minTemperatures, setMinTemperatures] = useState([])
  const [precipitationProbabilities, setPrecipitationProbabilities] = useState([])
  const [dailyCards, setDailyCards] = useState([])
  
  const clickHandler =(e)=>{
    setCity(userInput.current.value)
    setCount(pC => pC+1)
    console.log(city,'inclickhandler')
  }
  

  
  useEffect(()=>{
    if (city != "London") {
      const requestURL = `https://us1.locationiq.com/v1/search?key=pk.91b221e896c050904a3a4780b44e416e&q=${city}&format=json`;
      fetch(requestURL)
    .then((response) => response.json())
    .then((data) => setLatLong([data[0]['lat'],data[0]['lon']]))
    } else {
      const requestURL = `https://us1.locationiq.com/v1/search?key=pk.91b221e896c050904a3a4780b44e416e&q=london&format=json`;
      fetch(requestURL)
    .then((response) => response.json())
    .then((data) => setLatLong([data[0]['lat'],data[0]['lon']]))
   }
   console.log(latLong)
   const latlongURL = `https://api.open-meteo.com/v1/forecast?latitude=${latLong[0]}&longitude=${latLong[1]}&timezone=auto&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max`;
   fetch(latlongURL)
   .then((response) => response.json())
   .then((data) => {
    let dailyData = [
      {
        'maxTemp': 0,
        'minTemp' : 0,
        'rainProb' : 0
      },
      {
        'maxTemp': 0,
        'minTemp' : 0,
        'rainProb' : 0
      },
      {
        'maxTemp': 0,
        'minTemp' : 0,
        'rainProb' : 0
      }
    ]

    let maxDailyTemps = data['daily']['temperature_2m_max'];
    maxDailyTemps.slice(0,3).forEach((element, index) => {
      dailyData[index]['maxTemp'] = element
    });
    let minDailyTemps = data['daily']['temperature_2m_min'];
    minDailyTemps.slice(0,3).forEach((element, index) => {
      dailyData[index]['minTemp'] = element
    });
    let precipitationProbs = data['daily']['precipitation_probability_max']
    precipitationProbs.slice(0,3).forEach((element, index) => {
      dailyData[index]['rainProb'] = element
    });
    console.log(dailyData)
    let dailyCardArray = dailyData.map((e)=>{
       return <DailyCard maxTemperature={e['maxTemp']} minTemperature={e['minTemp']} rainProb={e['rainProb']}/>
    })
    setDailyCards(dailyCardArray)
    });
   }
   
   ,[count])
 


  
  

  return (
    <div className="App">
      <h2>Weather App</h2>
      <input className='border-green-400 border-1'  type='text' ref={userInput} onClick={clickHandler}/>
      <button >Check weather</button>
      <div className='border-green-400 border-1'>
         {dailyCards}
      </div>
    </div>
  )
}

export default App
