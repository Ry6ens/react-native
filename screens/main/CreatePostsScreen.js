import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import { db, storage } from '../../firebase/config';

import { getUserId } from '../../redux/auth/auth-selectors';

import MapPinIcon from '../../components/icons/MapPin';
import CameraIcon from '../../components/icons/Camera';

export default function CreatePostsScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [isShowKeyBoard, setShowKeyBoard] = useState(false);

  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState({ city: '', country: '' });

  const userId = useSelector(getUserId);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const address = await Location.reverseGeocodeAsync(location.coords);
      const { city, country } = address[0];
      setAddress({ city, country });
    })();
  }, []);

  const takePicture = async () => {
    const picture = await camera.takePictureAsync();
    setPicture(picture.uri);
  };

  const uploadPicture = async () => {
    const response = await fetch(picture);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const storageRef = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(storageRef, file);
    const uploadToServer = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );
    return uploadToServer;
  };

  const uploadPost = async () => {
    const picture = await uploadPicture();

    const docRef = await addDoc(collection(db, 'posts'), {
      uid: userId,
      picture: picture,
      title: title,
      location: location.coords,
      address: address,
    });
  };

  const createPost = () => {
    uploadPost();
    navigation.navigate('Posts');

    setPicture(null);
    setTitle('');
  };

  const keyboardHide = () => {
    setShowKeyBoard(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.inner}>
          <Camera style={styles.photoContainer} type={type} ref={setCamera}>
            {picture && (
              <View style={styles.takePhotoContainer}>
                <Image source={{ uri: picture }} style={{ width: '100%', height: 240 }} />
              </View>
            )}
            <TouchableOpacity onPress={takePicture} style={styles.iconCamera}>
              <CameraIcon />
            </TouchableOpacity>
          </Camera>

          <Text style={styles.text}>Upload photo</Text>

          <TextInput
            style={styles.inputTitle}
            placeholder="Title..."
            value={title}
            onChangeText={value => {
              setTitle(value);
            }}
            onFocus={() => {
              setShowKeyBoard(true);
            }}
          />
          <View style={styles.inputOverlay}>
            <Text style={styles.inputLocation}>
              {address.city + ', ' + address.country}
            </Text>
            <MapPinIcon
              style={styles.icon}
              width="24"
              height="24"
              // onPress={() => navigation.navigate("Map")}
            />
          </View>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={createPost}>
            <Text style={styles.btnText}>Create post</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  photoContainer: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
  },
  takePhotoContainer: {
    position: 'absolute',
    width: '100%',
    height: 240,
    top: 0,
    left: 0,
  },
  iconCamera: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  text: {
    marginTop: 10,
    marginBottom: 50,
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  inputTitle: {
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  inputOverlay: { position: 'relative' },
  inputLocation: {
    marginTop: 30,
    paddingLeft: 30,
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  icon: { position: 'absolute', bottom: 15 },
  btn: {
    marginTop: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  btnText: { fontSize: 16, lineHeight: 19, color: '#fff' },
});
