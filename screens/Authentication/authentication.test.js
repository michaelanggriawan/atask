import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import Authentication from './authentication';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock('expo-local-authentication', () => {
  return {
    hasHardwareAsync: jest.fn().mockResolvedValue(true),
    authenticateAsync: jest.fn().mockResolvedValue({ success: true }),
  };
});

global.alert = jest.fn();

describe('Authentication Component', () => {
  it('displays the "Authenticate" button', () => {
    render(<Authentication />);
    const authenticateButton = screen.getByText('Authenticate');
    expect(authenticateButton).toBeTruthy();
  });

  it('navigates to "NoteManager" on successful authentication', async () => {
    render(<Authentication />);
    const authenticateButton = screen.getByText('Authenticate');
    fireEvent.press(authenticateButton);

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Authentication successful!');
    });
  });

  it('displays an error message on authentication failure', async () => {
    jest.spyOn(require('expo-local-authentication'), 'authenticateAsync').mockResolvedValue({ success: false });

    render(<Authentication />);
    const authenticateButton = screen.getByText('Authenticate');
    fireEvent.press(authenticateButton);

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Authentication failed or canceled.');
    });
  });
});
