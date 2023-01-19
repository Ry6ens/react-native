import { useState } from "react";
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
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

import MapPinIcon from "../../components/icons/MapPin";
import CameraIcon from "../../components/icons/Camera";

const initialState = {
  picture: null,
  title: "",
  // location: "Location...",
  location: null,
};

export default function CreatePostsScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [stateForm, setStateForm] = useState(initialState);
  const [isShowKeyBoard, setShowKeyBoard] = useState(false);

  const takePicture = async () => {
    const picture = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setStateForm((prevState) => ({ ...prevState, picture: picture.uri }));
    setStateForm((prevState) => ({ ...prevState, location: location.coords }));
  };

  const createPost = () => {
    navigation.navigate("Posts", stateForm);
    setStateForm(initialState);
  };

  const keyboardHide = () => {
    setShowKeyBoard(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.inner}>
          <Camera style={styles.photoContainer} type={type} ref={setCamera}>
            {stateForm.picture && (
              <View style={styles.takePhotoContainer}>
                <Image
                  source={{ uri: stateForm.picture }}
                  style={{ width: "100%", height: 240 }}
                />
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
            value={stateForm.title}
            onChangeText={(value) => {
              setStateForm((prevState) => ({ ...prevState, title: value }));
            }}
            onFocus={() => {
              setShowKeyBoard(true);
            }}
          />
          <View style={styles.inputOverlay}>
            <TextInput
              style={styles.inputLocation}
              // placeholder={stateForm.location}
              placeholder="Location..."
              value={stateForm.location}
              onChangeText={(value) => {
                setStateForm((prevState) => ({
                  ...prevState,
                  location: value,
                }));
              }}
              onFocus={() => {
                setShowKeyBoard(true);
              }}
            />
            <MapPinIcon
              style={styles.icon}
              width="24"
              height="24"
              onPress={() => navigation.navigate("Map")}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={createPost}
          >
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
    backgroundColor: "#fff",
  },
  photoContainer: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
  },
  takePhotoContainer: {
    position: "absolute",
    width: "100%",
    height: 240,
    top: 0,
    left: 0,
  },
  iconCamera: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  text: {
    marginTop: 10,
    marginBottom: 50,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  inputTitle: {
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  inputOverlay: { position: "relative" },
  inputLocation: {
    marginTop: 30,
    paddingLeft: 30,
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  icon: { position: "absolute", bottom: 15 },
  btn: {
    marginTop: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 100,
  },
  btnText: { fontSize: 16, lineHeight: 19, color: "#BDBDBD" },
});
