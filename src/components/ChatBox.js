import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const ChatBox = ({ message, username, timestamp, isUserMessage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.userText}>{username}</Text>
      <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <View style={[styles.boxText, isUserMessage && styles.userBoxText]}>
          <Text style={[styles.messageText, isUserMessage && styles.userMessageText]}>{message}</Text>
        </View>
        <Text style={styles.timeText}>{timestamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  userText: {
    color: '#000E08',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  boxText: {
    backgroundColor: '#F2F7FB',
    padding: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    marginTop: 12,
    alignSelf: 'flex-start', 
  },
  userBoxText: {
    backgroundColor: '#3D4A7A',
  },
  messageText: {
    color: '#000E08',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'left',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  timeText: {
    color: '#E1E2E2',
    fontSize: 10,
    fontFamily: 'Montserrat-Bold',
    marginTop: 8,
  },
});

export default ChatBox;
