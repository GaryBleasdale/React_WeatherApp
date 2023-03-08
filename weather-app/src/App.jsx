import { useState, useEffect, useRef } from 'react'
import DailyCard from './DailyCard';
import './index.css'

function App() {
  const userInput = useRef(0);
  const [city, setCity] = useState()
  const [dailyCards, setDailyCards] = useState([])


  const clickHandler = () => {
    let inputtedCity = userInput.current.value
    setCity(inputtedCity)
  }

  useEffect(() => {
    if (city != undefined){
      const requestURL = `https://us1.locationiq.com/v1/search?key=pk.91b221e896c050904a3a4780b44e416e&q=${city}&format=json`;
      fetch(requestURL)
        .then((response) => response.json())
        .then((data) => {
          let lat = data[0]['lat']
          let lon = data[0]['lon']
          const latlongURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max`;
          fetch(latlongURL)
            .then((response) => response.json())
            .then((data) => {
              let dailyData = [
                {
                  'maxTemp': 0,
                  'minTemp': 0,
                  'rainProb': 0
                },
                {
                  'maxTemp': 0,
                  'minTemp': 0,
                  'rainProb': 0
                },
                {
                  'maxTemp': 0,
                  'minTemp': 0,
                  'rainProb': 0
                }
              ]
  
              let maxDailyTemps = data['daily']['temperature_2m_max'];
              maxDailyTemps.slice(0, 3).forEach((element, index) => {
                dailyData[index]['maxTemp'] = element
              });
              let minDailyTemps = data['daily']['temperature_2m_min'];
              minDailyTemps.slice(0, 3).forEach((element, index) => {
                dailyData[index]['minTemp'] = element
              });
              let precipitationProbs = data['daily']['precipitation_probability_max']
              precipitationProbs.slice(0, 3).forEach((element, index) => {
                dailyData[index]['rainProb'] = element
              });
              console.log(dailyData)
              let dailyCardArray = dailyData.map((e,i) => {
                return <DailyCard maxTemperature={e['maxTemp']} minTemperature={e['minTemp']} rainProb={e['rainProb']} day={i} />
              })
              setDailyCards(dailyCardArray)
            });
        })
    }
    }
    , [city])

    let capitalizedCity = city.toUpperCase()




  return (
    <div>
      <h2>Weather App</h2>
      <input type='text' ref={userInput} />
      <button onClick={clickHandler}>Check weather</button>
      <div>Weather for {capitalizedCity}</div>
      <div className='cardContainer'>
        {dailyCards}

      </div>
    </div>
  )
}

export default App
