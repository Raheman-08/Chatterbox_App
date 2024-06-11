import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, TextInput } from 'react-native';
import Button from '../components/Button';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');

  const handlePressLogin = () => {
    if (username.trim()) {
      navigation.navigate('Chat', { username });
    } else {
      alert('Please enter a username');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/chat.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Enter Your Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Username"
          value={username}
          onChangeText={setUsername}
        />
        <View style={{ marginTop: 24, width: '100%' }}>
          <Button title="Submit" onPress={handlePressLogin} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    height: '30%',
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontSize: 24,
    color: '#000',
    marginTop: 24,
    fontFamily: 'Montserrat-Bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CDD1D0',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    width: '100%',
  },
});

export default Login;
