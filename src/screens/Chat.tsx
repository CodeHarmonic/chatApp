import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'; // Install this library if not installed

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const route: any = useRoute();

  const senderId = route?.params?.id; // Sender's ID
  const receiverId = route?.params?.item?.userId; // Receiver's ID

  const chatId =
    senderId < receiverId
      ? `${senderId}_${receiverId}`
      : `${receiverId}_${senderId}`; // Unique chat ID based on sender & receiver IDs

  useEffect(() => {
    // Fetch messages in real-time
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc') // Order messages by timestamp
      .onSnapshot(querySnapshot => {
        const fetchedMessages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  const sendMessage = async () => {
    if (inputText.trim()) {
      const newMessage = {
        senderId,
        receiverId,
        text: inputText,
        timestamp: firestore.FieldValue.serverTimestamp(), // Use server timestamp
      };

      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(newMessage);

      setInputText('');
    }
  };

  const renderItem = ({item}: any) => (
    <View
      style={[
        styles.messageContainer,
        {
          alignSelf: item.senderId === senderId ? 'flex-end' : 'flex-start',
          backgroundColor: item.senderId === senderId ? '#0078D4' : '#ECECEC',
        },
      ]}>
      <Text
        style={{
          color: item.senderId === senderId ? '#fff' : '#000',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        inverted
        style={styles.chatList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatList: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0078D4',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Chat;
