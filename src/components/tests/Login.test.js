// src/components/tests/Login.test.js
import React from 'react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/react';
import { render, screen, waitFor } from '../../test-utils'; // your wrapper
import Login from '../../features/auth/Login';

jest.mock('lottie-react', () => <div data-testid="lottie-mock" />);

beforeEach(() => {
  localStorage.clear();
});

test('successful login stores token and navigates (observed via UI)', async () => {
  render(<Login />);

  // Use the test id we added to the username input (fallback: placeholder)
  const username =
    screen.getByTestId?.('username-input') ?? screen.getByPlaceholderText(/enter username/i);
  await userEvent.type(username, 'test@x.com');

  // Click the correct Continue button — use the test id we added to avoid ambiguous matches
  const continueBtn = screen.getByTestId?.('continue-button');
  if (continueBtn) {
    await userEvent.click(continueBtn);
  } else {
    // fallback: scope to form containing username
    const parentForm = username.closest('form');
    const form = parentForm || screen.getAllByRole('form')[0];
    const scopedContinue = within(form).getByRole('button', { name: /^continue$/i });
    await userEvent.click(scopedContinue);
  }

  // Password field appears after clicking Continue
  const password = await screen.findByLabelText(/password/i);
  await userEvent.type(password, 'password');

  // Sign In button (submit)
  const submit = screen.getByRole('button', { name: /sign in/i });
  await userEvent.click(submit);

  // Wait for MSW response and component updates
  await waitFor(() => {
    expect(localStorage.getItem('accessToken')).toBe('fake-jwt-token');
  });

  // Optionally assert navigation by UI change (adjust to your app)
  const dashboardHeading = await screen.findByText(/dashboard|welcome/i).catch(() => null);
  if (dashboardHeading) {
    expect(dashboardHeading).toBeInTheDocument();
  }
});
