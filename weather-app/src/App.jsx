import { useState, useEffect, useRef } from 'react'

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};


function App() {
  const userInput = useRef(0);
  const [count, setCount] = useState(0)
  const [city, setCity] = useState("London")
  const [latLong, setLatLong] = useState([0,0])
  const [temperatures, setTemperatures] = useState([])
  
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
   const latlongURL = `https://api.open-meteo.com/v1/forecast?latitude=${latLong[0]}&longitude=${latLong[1]}&hourly=temperature_2m`;
   fetch(latlongURL)
   .then((response) => response.json())
   .then((data) => { let temperatures = data['hourly']['temperature_2m'].map((e)=>
   {
    return <p>{e}</p>
   }
   );
    setTemperatures(temperatures)
    console.log(city,temperatures)
  })
   },[count])



  
  

  return (
    <div className="App">
      <h2>Weather App</h2>
      <input className='border-green-400 border-1'  type='text' ref={userInput} onClick={clickHandler}/>
      <button >Check weather</button>
      <div>
         {temperatures}
      </div>
    </div>
  )
}

export default App
