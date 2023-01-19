import { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, FlatList } from "react-native";

import CommentIcon from "../../components/icons/Comment";
import MapPinIcon from "../../components/icons/MapPin";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    picture: "https://i.ibb.co/c8N1MhL/Rectangle-23.jpg",
    title: "First Item",
    location: "Kyiv",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    picture: "https://i.ibb.co/c8N1MhL/Rectangle-23.jpg",

    title: "Second Item",
    location: "Dnipro",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    picture: "https://i.ibb.co/c8N1MhL/Rectangle-23.jpg",
    title: "Third Item",
    location: "Lviv",
  },
];

export default function HomeScreen({ route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevstate) => [...prevstate, route.params]);
    }
  }, [route.params]);
  console.log(posts);

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
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Image
              source={{ uri: item.picture }}
              style={{ width: "100%", height: 240, borderRadius: 8 }}
            />
            <Text style={styles.postTitle}>{item.title}</Text>
            <View style={styles.postInner}>
              <View style={styles.postComment}>
                <CommentIcon width="18" height="18" />
                <Text style={styles.postCommentCounter}>0</Text>
              </View>
              <View style={styles.postComment}>
                <MapPinIcon width="18" height="18" />
                <Text style={styles.postLocation}>
                  {item.location.latitude}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
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
  overlay: { flexDirection: "row", alignItems: "center" },
  overlayName: { marginLeft: 10 },
  name: { fontFamily: "RobotoBold", fontSize: 13, lineHeight: 15 },
  email: { fontSize: 11, lineHeight: 13 },
  post: { marginVertical: 35 },
  postTitle: {
    marginTop: 10,
    fontFamily: "RobotoMedium",
    fontSize: 16,
    lineHeight: 19,
  },
  postInner: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postComment: { flexDirection: "row", justifyContent: "center" },
  postCommentCounter: {
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  postLocation: {
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});
