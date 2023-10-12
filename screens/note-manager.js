import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteManager = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = async (updatedNotes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const addNote = () => {
    if (newNote.trim() === '') return;

    const updatedNotes = [...notes, newNote];
    saveNotes(updatedNotes);
    setNewNote('');
  };

  const editNote = (index, editedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = editedNote;
    saveNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    saveNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new note"
        value={newNote}
        onChangeText={(text) => setNewNote(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={addNote}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        renderItem={({ item, index }) => (
          <View style={styles.note}>
            <TextInput
              style={styles.noteText}
              value={item}
              onChangeText={(text) => editNote(index, text)}
            />
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNote(index)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(_item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#405DE6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  noteText: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default NoteManager;
