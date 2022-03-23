import { gql } from "@apollo/client";

export default function getUserQuery(username)  {
  return gql`
query {
  user(login: "${username}") {
    id
    avatarUrl(size: 100)
    bio
    company
    email
    location
    login
    name
    websiteUrl
    twitterUsername
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories(first: 50) {
      edges {
        node {
          id
          isFork
          name
          primaryLanguage {
            color
            name
          }
          stargazerCount
          description
        }
      }
      totalCount
    }
  }
}
`;
};

