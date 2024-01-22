import { Background } from './homepage'
import { useLocation } from 'react-router-dom'
import { Button, Box } from '@mui/material';


function Detail() {
  const location = useLocation();
  const apiData = location.state.apiData
  const handleWeather = () => {
    console.log('clicked');
  }
  const flag_img = apiData[0].flags.png;
  return (
    <Background>
    <Box sx={{display: 'flex',flexDirection: 'column',height: '100vh',width: '100vw',}}>
      <Box sx={{display: 'flex',height: '30%',flexDirection: 'row',width: '100%',justifyContent: 'center',alignItems: 'center',gap: '3%',fontSize: '2em'}}>
        <img src={flag_img}/>
        <p>{apiData[0].name.common.toUpperCase()}</p>
      </Box>
      <Box sx={{display: 'flex',height: '70%',flexDirection: 'row',width: '100%',justifyContent: 'center',alignItems: 'center',}}>
        <Box sx={{display: 'flex',height: '100%',flexDirection: 'column',alignItems: 'center',width: '70%', fontSize: '1.3em'}}>
          <p>Capital: {apiData[0].capital[0]}</p>   
          <p>Population: {apiData[0].population}</p>
          <p>Latitude: {apiData[0].latlng[0]}</p>
          <p>Longitude: {apiData[0].latlng[1]}</p>
        </Box>
        <Box sx={{display: 'flex',height: '100%',width: '30%',justifyContent: 'center'}}>
          <Button variant="contained" color="secondary" sx={{ color: 'aliceblue', height: '40px'}} onClick={handleWeather}>
            Show Weather
          </Button>
        </Box>
      </Box>
    </Box>
    </Background>   
  )
}

export default Detail
