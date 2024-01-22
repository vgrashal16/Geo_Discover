import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from '../pages/homepage';

test('renders Homepage component', () => {
  render(
    <Router>
      <Homepage />
    </Router>
  );
  const geoDiscoveryText = screen.getByText(/Geo Discovery/i);
  expect(geoDiscoveryText).toBeInTheDocument();
});

test('search button is disabled when no input', () => {
  render(
    <Router>
      <Homepage />
    </Router>
  );

  const searchButton = screen.getByRole('button', { name: /search/i });
  expect(searchButton).toBeDisabled();
});

test('search button is enabled when input is provided', () => {
  render(
    <Router>
      <Homepage />
    </Router>
  );

  const inputField = screen.getByLabelText(/Enter Country Name/i);
  const searchButton = screen.getByRole('button', { name: /search/i });

  fireEvent.change(inputField, { target: { value: 'Canada' } });

  expect(searchButton).toBeEnabled();
});

// Add more test cases as needed...
