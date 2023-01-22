import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { nanoid } from 'nanoid';

import { getUserId } from '../../redux/auth/auth-selectors';

import { db } from '../../firebase/config';

export default function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const userId = useSelector(getUserId);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const q = query(collection(db, 'posts'), where('uid', '==', userId));
    await onSnapshot(q, data => setPosts(data.docs.map(doc => ({ ...doc.data() }))));
  };

  console.log(posts);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => nanoid()}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        horizontal={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.post}
            onPress={() =>
              navigation.navigate('Comments', {
                postId: item.id,
                picture: item.picture,
              })
            }
          >
            <Image
              source={{ uri: item.picture }}
              style={{
                // width: '100%',
                height: 240,
                borderRadius: 8,
              }}
            />
          </TouchableOpacity>

          // <View style={styles.post}>
          //   <TouchableOpacity
          //     activeOpacity={0.8}
          //     onPress={() =>
          //       navigation.navigate('Comments', {
          //         postId: item.id,
          //         picture: item.picture,
          //       })
          //     }
          //   >
          //     <Image
          //       source={{ uri: item.picture }}
          //       style={{ width: '100%', height: 240, borderRadius: 8 }}
          //     />
          //   </TouchableOpacity>
          // </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  post: {
    flex: 1,
    margin: 2,
    // width: 100,
    // height: 240,
    // backgroundColor: '#00BFA5',
    // justifyContent: 'center',
    // alignItems: 'center',
    objectFit: 'contain',
  },
});
