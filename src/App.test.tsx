import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing page heading', () => {
  render(<App />);
  const heading = screen.getByText(/designing digital experiences/i);
  expect(heading).toBeInTheDocument();
});
