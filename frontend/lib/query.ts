import { gql} from "@apollo/client";

export const GetPosts = gql`
query GetPosts{
    posts{
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
      posts
    }
  }
  }
}
`