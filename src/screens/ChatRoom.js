import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import io from 'socket.io-client';
import ChatBox from '../components/ChatBox';

const socket = io('https://chatterbox-ct0w.onrender.com/'); // Replace with your server address

const ChatRoom = ({ route }) => {
  const { username } = route.params || {};

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const scrollViewRef = useRef();
  const lastBadgeDateRef = useRef('');

  useEffect(() => {
    if (username) {
      socket.emit('join', JSON.stringify({ username }));
    }

    socket.on('message', (msg) => {
      const msgData = JSON.parse(msg);
      setMessages((prevMessages) => [...prevMessages, msgData]);
    });

    socket.on('usersCount', (count) => {
      setUsersCount(count.totalUsers);
      setOnlineUsersCount(count.onlineUsers);
    });

    return () => {
      socket.off('message');
      socket.off('usersCount');
    };
  }, [username]);

  const handleSend = () => {
    if (message.trim()) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const date = new Date().toDateString(); // Store the date string
      const msgData = { message, timestamp, username, date };
      socket.emit('chat message', JSON.stringify(msgData));
      setMessage('');

      // Scroll to the bottom after sending the message
      scrollToBottom();
    }
  };

  // Function to scroll to the bottom of the chat messages
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll to bottom whenever messages change

  const renderDateBadge = (date) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (date === today) {
      return 'Today';
    } else if (date === yesterday) {
      return 'Yesterday';
    } else {
      return date;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/Chatprofile.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.chatInfo}>
          <Text style={styles.chatName}>Team ChatterBox</Text>
          <Text style={styles.infoText}>{`${usersCount} Members, ${onlineUsersCount} Online`}</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messageContainer}
        contentContainerStyle={styles.messageContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <Text style={styles.emptyMessageText}>Welcome to ChatterBox! Start chatting...</Text>
        ) : (
          messages.reduce((acc, msg, index) => {
            const dateBadge = renderDateBadge(msg.date);
            const prevMsg = messages[index - 1];

            // Add the date badge if it's a new date or the first message, and only if the dateBadge is valid
            if ((!prevMsg || prevMsg.date !== msg.date) && dateBadge) {
              acc.push(
                <View key={`badge-${index}`} style={styles.dateBadgeContainer}>
                  <Text style={styles.dateBadgeText}>{dateBadge}</Text>
                </View>
              );
              lastBadgeDateRef.current = msg.date;
            }

            // Check if the message is a notification type
            if (msg.type === 'notify') {
              acc.push(
                <View key={`notify-${index}`} style={styles.notification}>
                  <Text style={styles.notificationText}>
                    {msg.username === username ? 'You joined the chat' : `${msg.username} has joined the chat`}
                  </Text>
                </View>
              );
            } else {
              acc.push(
                <View
                  key={index}
                  style={[
                    styles.chatBoxWrapper,
                    msg.username === username ? styles.userMessage : null,
                  ]}
                >
                  <ChatBox
                    message={msg.message}
                    username={msg.username === username ? 'You' : msg.username}
                    timestamp={msg.timestamp}
                    isUserMessage={msg.username === username}
                  />
                </View>
              );
            }

            return acc;
          }, [])
        )}
      </ScrollView>

      <View style={styles.fieldContainer}>
        <TextInput
          placeholder="Write your message"
          style={styles.input}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  chatHeader: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CDD1D0',
    gap: 12,
    alignItems: 'center',
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 200,
    overflow: 'hidden',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  chatInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  chatName: {
    color: '#000E08',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  infoText: {
    color: '#BCBDBD',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginTop: 6,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#FFF',
  },
  input: {
    backgroundColor: '#F3F6F6',
    padding: 16,
    borderRadius: 100,
    flex: 1,
    marginRight: 8,
    ...Platform.select({
      android: {
        paddingLeft: 16,
      },
    }),
  },
  sendBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 100,
    height: '100%',
    width: 'auto',
  },
  sendBtnText: {
    color: '#FFF',
    fontSize: 16,
    paddingVertical: 10,
  },
  messageContainer: {
    flex: 1,
    marginHorizontal: 24,
    marginBottom: 5, // Add some margin to ensure the last message is not hidden
  },
  messageContentContainer: {
    paddingBottom: 20, // Additional padding for the last message
  },
  chatBoxWrapper: {
    marginBottom: 10, // Add margin bottom to create spacing between ChatBox components
  },
  userMessage: {
    alignSelf: 'flex-end', // Align user's messages to the right side
  },
  emptyMessageText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
  dateBadgeContainer: {
    alignSelf: 'center',
    backgroundColor: '#E1E2E2',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 10,
  },
  dateBadgeText: {
    color: '#000',
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },
  notification: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  notificationText: {
    color: '#555',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium'
  },
});

export default ChatRoom;
