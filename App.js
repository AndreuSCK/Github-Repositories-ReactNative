import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  createHttpLink,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React, { useState } from "react";
import { AppRegistry } from "react-native";
import HomeScreen from "./layouts/HomeScreen";
import UserProfile from "./layouts/UserProfile";

const Stack = createNativeStackNavigator();

export default function App() {

  // Initialize ApolloClient with the link to the GraphQL API
  const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = "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";
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={UserProfile}
            screenOptions={{
              headerTintColor: "#fff",
              headerStyle: { backgroundColor: "#0a0a0a" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
AppRegistry.registerComponent("MyApplication", () => App);
