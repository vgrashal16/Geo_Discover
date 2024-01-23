import {Component, ChangeEvent } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';
import withRouter from '../withRouter';

export const Background = styled('div')({
  backgroundColor: 'black',
  backgroundSize: 'cover',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

class Homepage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      country_input: '',
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({
      country_input: value.startsWith(' ') ? value.trimStart() : value,
    });
  };

  fetchData = async () => {
    const { country_input } = this.state;
    const { navigate } = this.props;
    const res = await fetch(`https://restcountries.com/v3.1/name/${country_input}?fullText=true`);
    const data = await res.json();
    if (data.status !== 404) {
      navigate(`/${country_input}`, { state: { apiData: data[0] } });
    } else {
      toast.error('Country not found');
    }
  };

  handleSearch = () => {
    this.fetchData();
  };

  render() {
    const { country_input } = this.state;
    const isSearchDisabled = country_input.length === 0;

    return (
      <Background>
        <Toaster position="top-center" reverseOrder={false} />
        <Box sx={{ display: 'flex', marginBottom: '460px', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ marginBottom: '50px', fontSize: '3em' }}>Geo Discovery🌍</Box>
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
              onChange={this.handleChange}
              inputProps={{
                style: { color: 'aliceblue' },
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
              onClick={this.handleSearch}
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
    );
  }
}

export default withRouter(Homepage);
