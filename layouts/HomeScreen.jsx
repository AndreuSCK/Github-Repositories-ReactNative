import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState("");

  // 
  const handleSubmit = () => {
    navigation.navigate("Profile", { username: user });
    setUser("");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.githubLogo}
        source={require("../assets/GitHub-Logo.png")}
      />

      <Text style={styles.description}>Enter a GitHub Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value = {user}
        onChangeText={(value) => setUser(value)}
      />
      <Pressable
        title="Search"
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.button]}
        onPress={() => handleSubmit()}
      >
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff0f5",
    alignItems: "center",
  },
  description: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  githubLogo: {
    marginTop: "5%",
    marginBottom: "5%",
    width: "60%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: "#0a0a0a",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    elevation: 6,
  },
  buttonText: {
    fontSize: 22,
    lineHeight: 15,
    fontWeight: "bold",
    letterSpacing: 0.75,
    color: "white",
  },
});

export default HomeScreen;
