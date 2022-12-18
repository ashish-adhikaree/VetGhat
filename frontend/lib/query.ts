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
          publishedAt
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
  
`;



  
