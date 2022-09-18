import React, {useState,useEffect} from 'react'
import Weathercard from './Weathercard';
import "./style.css";


export default function Temp() {
  const [searchValue, setSearchValue] = useState("New Delhi");
  const [tempInfo, setTempInfo] = useState("");

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=f25e80f007c4124da54c75eb8762008b`
      const res = await fetch(url);
      const data = await res.json();

      const {temp, humidity, pressure} = data.main;
      const {main: weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset} = data.sys; 
      
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
      
      console.log(data, temp);
    
    }
    catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);
  
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input type="search" 
                  placeholder='search...'
                  autoFocus
                  id="search"
                  className='searchTerm' 
                  value = {searchValue}
                  onChange = {(e) => setSearchValue(e.target.value)}/>
                  <button className='searchButton'
                   type="button"
                   onClick={getWeatherInfo}>
                    Search
                  </button>
        </div>
      </div>

      <Weathercard tempInfo = {tempInfo}/>
    </>
  )
}
