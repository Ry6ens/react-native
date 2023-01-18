import { StyleSheet, View, Image, Text } from "react-native";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image
          source={require("../../assets/images/avatar.jpg")}
          style={styles.img}
        />
        <View style={styles.overlayName}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, paddingTop: 30 },
  overlay: { flexDirection: "row", alignItems: "center" },
  overlayName: { marginLeft: 10 },
  name: { fontFamily: "RobotoBold", fontSize: 13, lineHeight: 15 },
  email: { fontSize: 11, lineHeight: 13 },
});
