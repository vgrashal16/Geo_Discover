import {Component} from 'react';
import { Background } from './homepage';
import { Button, Box } from '@mui/material';
import withRouter from '../withRouter';

interface WeatherData {
  wind: {
    speed: number;
  };
  main: {
    temp: number;
  };
}

class Detail extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isWeatherVisible: false,
      weatherData: null as WeatherData | null,
    };
  }

  fetchData = async () => {
    const { apiData } = this.props.location.state;
    const API_KEY = '97d09493a27e75636d61161cdff20e78';
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${apiData.latlng[0]}&lon=${apiData.latlng[1]}&appid=${API_KEY}`
    );
    const weatherData = await res.json();
    return weatherData;
  };

  handleWeather = async () => {
    const { isWeatherVisible } = this.state;

    if (isWeatherVisible) {
      this.setState({
        isWeatherVisible: false,
        weatherData: null,
      });
    } else {
      this.setState({
        isWeatherVisible: true,
      });
      const data = await this.fetchData();
      this.setState({
        weatherData: data,
      });
    }
  };

  handleBack = () => {
    this.props.navigate('/');
  };

  render() {
    const { apiData } = this.props.location.state;
    const { isWeatherVisible, weatherData } = this.state;
    const flag_img = apiData.flags.png;

    return (
      <Background>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
          <Box sx={{ height: '10%' }}>
            <Button sx={{ color: 'aliceblue', width: '5%' }} onClick={this.handleBack}>
              &lt; Go Back
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              height: '30%',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '3%',
              fontSize: '2em',
            }}
          >
            <img src={flag_img} alt="Country Flag" />
            <p>{apiData.name.common.toUpperCase()}</p>
          </Box>
          <Box
            sx={{
              display: 'flex',
              height: '60%',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                width: '70%',
                fontSize: '1.3em',
              }}
            >
              <p>Capital: {apiData.capital[0]}</p>
              <p>Population: {apiData.population}</p>
              <p>Latitude: {apiData.latlng[0]} °</p>
              <p>Longitude: {apiData.latlng[1]} °</p>
            </Box>
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                width: '40%',
                flexDirection: 'column',
                fontSize: '1.3em',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                sx={{ color: 'aliceblue', height: '40px', width: '160px' }}
                onClick={this.handleWeather}
              >
                {isWeatherVisible ? 'Hide Weather' : 'Show Weather'}
              </Button>
              {isWeatherVisible && (
                <>
                  <p data-testid="wind-speed">Wind Speed: {weatherData ? weatherData.wind.speed : 'Wind Loading...'} meter/sec</p>
                  <p data-testid="temperature">
                    Temperature: {weatherData ? (weatherData.main.temp - 273.15).toFixed(2) : 'Temp Loading...'} °C
                  </p>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Background>
    );
  }
}

export default withRouter(Detail);
