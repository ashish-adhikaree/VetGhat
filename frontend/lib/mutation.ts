import { gql } from "@apollo/client";

export const SignUp = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!){
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export const Login = gql`
mutation Login($email: String!, $password: String!){
    login(input: { identifier: $email, password: $password }) {
        jwt
      }
}
`
