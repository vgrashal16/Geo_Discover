import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Background = styled('div')({
  // backgroundImage: `url(${bg})`,
  backgroundColor: 'black',
  backgroundSize: 'cover',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  });


function Homepage() {
  const [country_input, setcountry_input] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setcountry_input(e.target.value);
  }

  const fetchData = async() => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country_input}?fullText=true`);
    const data = await res.json();
    if (data.status != 404){
      navigate(`/${country_input}`, { state: { apiData: data[0] } });
    }
    else{
      console.log(data.status);
    }
  }

  const handleSearch = () => {
    fetchData();
  }

  const isSearchDisabled = country_input.length == 0;
  return (
    <Background>
          <Box sx={{ display: 'flex', marginBottom: '460px', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ marginBottom: '50px', fontSize: '3em' }}>
            Geo Discovery🌍
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            <TextField
              label="Enter Country Name"
              variant="outlined"
              value={country_input}
              onChange={handleChange}
              inputProps={{
                style: { color: 'aliceblue' }             
              }}
              InputLabelProps={{
                style: { color: 'aliceblue' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'aliceblue',
                  },
                  '&:hover fieldset': {
                    borderColor: 'aliceblue',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'aliceblue',
                  },
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              style={{
                color: 'aliceblue',
                backgroundColor: isSearchDisabled ? 'grey' : '#1976D2',
              }}
              disabled={isSearchDisabled}
            >
              Search
            </Button>
          </Box>
        </Box>
    </Background>
  )
}

export default Homepage
