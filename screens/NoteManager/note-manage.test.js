import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import NoteManager from './note-manager';
import { act } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage methods
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(JSON.stringify(['Sample Note'])),
  setItem: jest.fn(),
}));

describe('NoteManager Component', () => {
    it('adds a new note when the "Add" button is pressed', async () => {
        const { getByTestId } = render(<NoteManager />);
        const addButton = getByTestId('add-button');
        const inputField = getByTestId('note-input');
      
        act(() => {
          fireEvent.changeText(inputField, 'this is text');
          fireEvent.press(addButton);
        });
      
        await waitFor(() => {
          expect(inputField.props.value).toBe('this is text'); // Input field is cleared
        });
      });
      

  it('edits a note when its text is changed', async () => {
    const { getByTestId } = render(<NoteManager />);
    
    const noteTextFields = getByTestId('note-text-0');
    const newNoteText = 'Updated Test Note';

    fireEvent.changeText(noteTextFields, newNoteText);

    await waitFor(() => {
      const updatedNoteTextField = getByTestId('note-text-0');
      expect(updatedNoteTextField.props.value).toBe(newNoteText);
    });
  });

  it('deletes a note when the "Delete" button is pressed', async () => {
    const { getAllByText } = render(<NoteManager />);
    const deleteButtons = getAllByText('Delete');

    fireEvent.press(deleteButtons[0]);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('notes', JSON.stringify([]));
    });
  });
});
