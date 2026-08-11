import { render, screen } from '@testing-library/react';
import App from './app/App';

test('renders the landing page heading', () => {
  render(<App />);
  const heading = screen.getByText(/designing digital experiences/i);
  expect(heading).toBeInTheDocument();
});
