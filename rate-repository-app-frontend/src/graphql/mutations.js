import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation UserSignIn($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation userSignUp($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;
