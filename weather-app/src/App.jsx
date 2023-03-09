import { useState, useEffect, useRef } from 'react'
import DailyCard from './DailyCard';
import './index.css'
import mapboxgl from 'mapbox-gl'
import logo from './assets/3dayforecast_logo.png'



function App() {
  const userInput = useRef(0);
  const [city, setCity] = useState()
  const [dailyCards, setDailyCards] = useState([])

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapBox, setMap] = useState(null);



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
            if (map.current) {
              map.current.remove()
            } 
            map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lon, lat],
            zoom: 8
            });
            setMap(map.current)
            return ()=>{
              if (map) {
                map.remove()
              }
            }
        })
    }
    }
    , [city])

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FyeWJsZWFzZGFsZSIsImEiOiJjbGYxYWMwOXowNmczM3RycXN3bXZuY2k0In0._W6JxpLLdLGoW2vLsaFtiQ';




  return (
    <div className="container">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="form-group">
        <input type='text' ref={userInput} className="form-control" placeholder="Enter a city name"/>
        <button onClick={clickHandler} className="btn btn-primary">Check weather</button>
      </div>
      { city && <div className="city-name">Showing weather for <strong classList='city-name'>{city}</strong></div>}
      <div className='cardContainer'>
        {dailyCards}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default App
