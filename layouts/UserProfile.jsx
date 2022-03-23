import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useQuery } from "@apollo/client";

import getUserQuery from "../graphql/getUserQuery";

export default function UserProfile({ navigation, route }) {
  const { username } = route.params;
  const [filter, setFilter] = useState("");

  const { loading, error, data } = useQuery(getUserQuery(`${username}`), {});
  if (loading) return <Text style={styles.queryAlert}>Loading ...</Text>;
  if (error) return <Text style={styles.queryAlert}>Profile not found</Text>;
  const { user } = data;

  const basicInfo = (detail) => {
    const key = Object.keys(detail)[0];
    if (!detail[key]) return;
    return (
      <View style={styles.userBasicInfoContainer}>
        <Image
          style={styles.userBasicInfoIcon}
          source={require(`../assets/icons/${key}.png`)}
        />
        <Text style={styles.userBasicInfoText}>{detail[key]}</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.userContainer}>
        <View style={styles.userHeader}>
          {user.avatarUrl && (
            <Image style={styles.userAvatar} source={{ uri: user.avatarUrl }} />
          )}
          <Text style={styles.userName}>{user.login}</Text>
        </View>

        {user.bio && (
          <View style={styles.userBio}>
            <Text style={styles.userBioText}>{user.bio}</Text>
          </View>
        )}

        {basicInfo({ location: user.location })}
        {basicInfo({ email: user.email })}
        {basicInfo({ company: user.company })}
        {basicInfo({ websiteUrl: user.websiteUrl })}
        {basicInfo({ twitter: user.twitterUsername })}

        <View style={styles.userBasicInfoContainer}>
          <Image
            style={styles.userBasicInfoIcon}
            source={require(`../assets/icons/people.png`)}
          />
          <Text style={styles.userBasicInfoText}>
            <Text style={{ fontWeight: 500 }}>{user.followers.totalCount}</Text>{" "}
            followers ·{" "}
            <Text style={{ fontWeight: 500 }}>{user.following.totalCount}</Text>{" "}
            following
          </Text>
        </View>
      </View>

      <View style={styles.repositoriesContainer}>
        <TextInput
          style={styles.searchFilter}
          placeholder="Filter repos"
          value={filter}
          onChangeText={(value) => setFilter(value.toLowerCase())}
        />

        {user.repositories.edges
          .filter((repo) => repo.node.name.toLowerCase().startsWith(filter))
          .map((repo, index) => {
            return (
              <View style={styles.userRepository} key={index}>
                <Text style={styles.userRepositoryName}>{repo.node.name}</Text>
                <Text style={styles.userRepositoryDescription}>
                  {repo.node.description}
                </Text>
                <View style={styles.starContainer}>
                  <Image
                    style={styles.starImage}
                    source={require(`../assets/icons/star.png`)}
                  />
                  <Text style={styles.starImageText}>
                    {repo.node.stargazerCount}
                  </Text>
                  {repo.node.primaryLanguage && (
                    <>
                      <View
                        style={[
                          styles.circle,
                          { backgroundColor: repo.node.primaryLanguage.color },
                        ]}
                      />
                      <Text style={styles.circleText}>
                        {repo.node.primaryLanguage.name}
                      </Text>
                    </>
                  )}
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "5%",
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: "25%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: "50%",
  },
  userName: {
    marginLeft: "5%",
    fontSize: 20,
    fontWeight: "bold",
  },
  userBio: {
    marginTop: "4%",
    marginBottom: "5%",
  },
  userBioText: {
    fontSize: 19,
    fontWeight: 400,
  },
  userBasicInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userBasicInfoIcon: {
    width: "8%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    marginRight: "5%",
  },
  userBasicInfoText: {
    fontSize: 20,
    fontWeight: 400,
  },
  repositoriesContainer: {
    backgroundColor: "#fff",
  },
  userRepository: {
    borderBottomWidth: 1,
    borderColor: "#eff0f5",
    padding: "5%",
  },
  userRepositoryName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  userRepositoryDescription: {
    fontSize: 19,
    fontWeight: 400,
  },
  starContainer: {
    flexDirection: "row",
    marginTop: "2%",
  },
  starImage: {
    width: "8%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    marginRight: "2%",
  },
  starImageText: {
    fontSize: 20,
    fontWeight: 400,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    backgroundColor: "#ff0000",
    marginTop: "2%",
    marginLeft: "5%",
  },
  circleText: {
    fontSize: 20,
    fontWeight: 400,
    marginLeft: "2%",
  },
  queryAlert: {
    flex: 1,
    fontSize: 35,
    marginTop: "30%",
    justifyContent: "center",
    alignSelf: "center",
  },
  searchFilter: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    margin: "3%",
    fontSize: 19,
    lineHeight: 15,
    fontWeight: "bold",
    letterSpacing: 0.75,
    color: "#0a0a0a",
    padding: "2%",
    width: "75%",
  },
});
