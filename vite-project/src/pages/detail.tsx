import { Background } from './homepage'
import { useLocation } from 'react-router-dom'
import { Button, Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface WeatherData {
  wind: {
    speed: number;
  };
  main: {
    temp: number;
  };
}


const Detail: React.FC<any> = () => {
  const location = useLocation();
  const apiData = location.state.apiData
  const API_KEY = '97d09493a27e75636d61161cdff20e78';

  const fetchData = async() => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${apiData.latlng[0]}&lon=${apiData.latlng[1]}&appid=${API_KEY}`);
    const weatherData = await res.json();
    return weatherData;
  }

  const [isWeatherVisible, setWeatherVisible] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const navigate = useNavigate();

  const handleWeather = async () => {
    if (isWeatherVisible) {
      setWeatherVisible(false);
      setWeatherData(null);
    } 
    
    else {
      setWeatherVisible(true);
      const data = await fetchData();
      setWeatherData(data);
    }
  };
  
  const handleBack = () => {
    navigate(`/`);
  }
  const flag_img = apiData.flags.png;
  console.log(weatherData);
  return (
    <Background>
    <Box sx={{display: 'flex',flexDirection: 'column',height: '100vh',width: '100vw',}}>
      <Box sx={{ height: '10%' }}>
        <Button sx={{ color: 'aliceblue', width: '5%' }} onClick={handleBack}>
          &lt; Go Back
        </Button>
      </Box>
      <Box sx={{display: 'flex',height: '30%',flexDirection: 'row',width: '100%',justifyContent: 'center',alignItems: 'center',gap: '3%',fontSize: '2em'}}>
        <img src={flag_img}/>
        <p>{apiData.name.common.toUpperCase()}</p>
      </Box>
      <Box sx={{display: 'flex',height: '60%',flexDirection: 'row',width: '100%',justifyContent: 'center',alignItems: 'center',}}>
        <Box sx={{display: 'flex',height: '100%',flexDirection: 'column',alignItems: 'center',width: '70%', fontSize: '1.3em'}}>
          <p>Capital: {apiData.capital[0]}</p>   
          <p>Population: {apiData.population}</p>
          <p>Latitude: {apiData.latlng[0]} °</p>
          <p>Longitude: {apiData.latlng[1]} °</p>
        </Box>
        <Box sx={{display: 'flex',height: '100%',width: '40%', flexDirection: 'column', fontSize: '1.3em'}}>
          <Button variant="contained" color="secondary" sx={{ color: 'aliceblue', height: '40px', width: '160px'}} onClick={handleWeather}>  
            {isWeatherVisible ? 'Hide Weather' : 'Show Weather'}
          </Button>
          {isWeatherVisible && (
            <>
              <p data-testid="wind-speed">Wind Speed: {weatherData ? weatherData.wind.speed : 'Wind Loading...'} meter/sec</p>
              <p data-testid="temperature">Temperature: {weatherData ? (weatherData.main.temp-273.15).toFixed(2) : 'Temp Loading...'} °C</p>
            </>
            )}
        </Box>
      </Box>
    </Box>
    </Background>   
  )
}

export default Detail
