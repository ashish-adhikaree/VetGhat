import { gql } from "@apollo/client";

export const SignUp = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        id
      }
    }
  }
`;

export const Login = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
      user {
        id
      }
    }
  }
`;

export const createPost = gql`
  mutation createPost($isPublic: Boolean!, $caption: String!, $content:[ID]!) {
    createPost(
      data: { isPublic: $isPublic, caption: $caption, content:$content}
    ) {
      data {
        id
        attributes {
          isPublic
          author {
            data {
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;

export const uploadContent = gql`
  mutation uploadContent($files: [Upload]!) {
    multipleUpload(
      files: $files
    ){
      data{
        id
      }
    }
  }
`;
