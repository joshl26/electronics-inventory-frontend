import { render, screen } from '@testing-library/react';
import Header from '../DashHeader';

test('renders heading text', () => {
  render(<Header title="Inventory" />);
  expect(screen.getByText(/inventory/i)).toBeInTheDocument();
});
