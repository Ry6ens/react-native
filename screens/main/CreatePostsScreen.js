import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import MapPinIcon from "../../components/icons/MapPin";
import CameraIcon from "../../components/icons/Camera";

export default function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <View style={styles.iconCamera}>
          <CameraIcon />
        </View>
      </View>
      <Text style={styles.text}>Upload photo</Text>
      <TextInput style={styles.inputTitle} placeholder="Title..." />
      <View style={styles.inputOverlay}>
        <TextInput style={styles.inputLocation} placeholder="Location..." />
        <MapPinIcon style={styles.icon} />
      </View>
      <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
        <Text style={styles.btnText}>Create post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 15,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  photoContainer: {
    width: "100%",
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
  },
  iconCamera: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    backgroundColor: "white",
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
