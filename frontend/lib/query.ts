import { gql} from "@apollo/client";

export const GetPosts = gql`
query GetPosts{
    posts(sort: "createdAt:desc"){
      data{
        id
        attributes{
          author{data{
            id
            attributes{
              username
              profilepic{
                data{
                  attributes{
                    url
                  }
                }
              }
            }
          }}
          isPublic
          caption
          createdAt
          content{
            data{
              attributes{
                url
              }
            }
          }
          heartcount
          commentcount
          sharecount
        }
      }
    }
  }
  
`

export const GetProfile = gql`
query GetProfile($id: ID!){
  usersPermissionsUser(id:$id){
    data{
    id
    attributes{
      username
      profilepic{
        data{
          attributes{
            url
          }
        }
      }
      followersCount
      followingCount
      postsCount
    }
  }
  }
}
`

export const GetProfilePosts = gql`
query GetPosts($id: ID!){
  posts(filters: { author: { id: {eq: $id}}}, sort: "createdAt:desc"){
    data{
      id
      attributes{
        commentcount
        heartcount
        content{
          data{
            attributes{
              url
            }
          }
        }
      }
    }
  }
}
`