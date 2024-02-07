import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories (orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          createdAt
          description
          forksCount
          fullName
          id
          language
          name
          ownerAvatarUrl
          ownerName
          ratingAverage
          reviewCount
          stargazersCount
          url
        }
      }
    }
  }
`;

export const GET_REPOSITORY_BY_ID = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      ownerName
      name
      createdAt
      fullName
      ratingAverage
      reviewCount
      stargazersCount
      watchersCount
      forksCount
      openIssuesCount
      url
      ownerAvatarUrl
      description
      language
      userHasReviewed
      reviews {
        edges {
          node {
            createdAt
            id
            rating
            text
          }
        }
      }
    }
  }
`;

export const GET_REVIEWS = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;
