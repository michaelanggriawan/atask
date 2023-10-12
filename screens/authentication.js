import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from '@react-navigation/native';

const Authentication = () => {
  const navigation = useNavigation();
  const handleAuthenticate = async () => {
    const isSupported = await LocalAuthentication.hasHardwareAsync();
    if (!isSupported) {
      alert("Fingerprint authentication is not supported on this device.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      navigation.navigate('NoteManager'); 
    } else {
      alert("Authentication failed or canceled.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <TouchableOpacity style={styles.authenticateButton} onPress={handleAuthenticate}>
          <Text style={styles.buttonText}>Authenticate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  centeredContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark gray text
    marginBottom: 20,
  },
  authenticateButton: {
    backgroundColor: '#405DE6',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Authentication;