import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { doc, collection, updateDoc, addDoc } from 'firebase/firestore';

import { db } from '../../firebase/config';

import { getUserName } from '../../redux/auth/auth-selectors';

import ArrowUp from '../../components/icons/ArrowUp';

export default function CommentsScreen({ route }) {
  const { postId, picture } = route.params;
  const [comment, setComment] = useState('');
  const userName = useSelector(getUserName);

  const createComment = async () => {
    const washingtonRef = doc(db, 'posts', postId);
    await addDoc(collection(washingtonRef, 'comments'), {
      comment,
      userName,
    });
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: picture }}
        style={{ width: '100%', height: 240, borderRadius: 8 }}
      />
      <View style={{ position: 'relative' }}>
        <TextInput
          style={styles.input}
          placeholder="Comment..."
          onChangeText={setComment}
          value={comment}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={createComment}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 34,
            height: 34,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FF6C00',
            borderRadius: '100%',
          }}
        >
          <ArrowUp width={10} height={14} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 15,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: '#20b2aa',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    paddingLeft: 15,
    height: 50,
    fontSize: 16,
    lineHeight: 19,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: '100px',
  },
});
