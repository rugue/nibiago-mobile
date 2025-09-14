import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const TestScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 App is Working!</Text>
      <Text style={styles.subtitle}>Navigation and components are loaded successfully</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>✅ React Native running</Text>
        <Text style={styles.statusText}>✅ Expo SDK loaded</Text>
        <Text style={styles.statusText}>✅ Navigation working</Text>
        <Text style={styles.statusText}>✅ Components rendering</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.inverse,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  statusContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  statusText: {
    fontSize: 14,
    color: Colors.text.inverse,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default TestScreen;
