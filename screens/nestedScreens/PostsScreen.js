import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { nanoid } from 'nanoid';

import { db } from '../../firebase/config';

import { getUserName, getUserEmail } from '../../redux/auth/auth-selectors';

import CommentIcon from '../../components/icons/Comment';
import MapPinIcon from '../../components/icons/MapPin';

export default function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const userEmail = useSelector(getUserEmail);
  const userName = useSelector(getUserName);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    await onSnapshot(collection(db, 'posts'), data => {
      setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image source={require('../../assets/images/avatar.jpg')} style={styles.img} />
        <View style={styles.overlayName}>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={item => nanoid()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('Comments', {
                  postId: item.id,
                  picture: item.picture,
                })
              }
            >
              <Image
                source={{ uri: item.picture }}
                style={{ width: '100%', height: 240, borderRadius: 8 }}
              />
            </TouchableOpacity>

            <Text style={styles.postTitle}>{item.title}</Text>
            <View style={styles.postInner}>
              <TouchableOpacity
                style={styles.postComment}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('Comments', {
                    postId: item.id,
                    picture: item.picture,
                  })
                }
              >
                <CommentIcon width="18" height="18" />
                <Text style={styles.postCommentCounter}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.postComment}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Map', { location: item.location })}
              >
                <MapPinIcon width="18" height="18" />
                <Text style={styles.postLocation}>{item.address.country}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
  overlay: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  overlayName: { marginLeft: 10 },
  name: { fontFamily: 'RobotoBold', fontSize: 13, lineHeight: 15 },
  email: { fontSize: 11, lineHeight: 13 },
  post: { marginVertical: 35 },
  postTitle: {
    marginTop: 10,
    fontFamily: 'RobotoMedium',
    fontSize: 16,
    lineHeight: 19,
  },
  postInner: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postComment: { flexDirection: 'row', justifyContent: 'center' },
  postCommentCounter: {
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  postLocation: {
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: 'underline',
  },
});
